import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Author, BasicEntity, Script, ViewsDownloads} from "../../interface/models";
import {ProductService} from "../../demo/service/product.service";
import {LayoutService} from "../../layout/service/app.layout.service";
import {ScriptService} from "../../services/script/script.service";
import {ScriptTypeService} from "../../services/script-type/script-type.service";
import {OperativeSystemService} from "../../services/operative-system/operative-system.service";
import {ToolService} from "../../services/tool/tool.service";
import {TecnologyService} from "../../services/tecnology/tecnology.service";
import {AuthorService} from "../../services/author/author.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Global} from "../../utils/Global";
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {FileUploadModule} from "primeng/fileupload";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PaginatorModule} from "primeng/paginator";
import {PanelModule} from "primeng/panel";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {CardModule} from "primeng/card";
import {RippleModule} from "primeng/ripple";
import {ChipsModule} from "primeng/chips";
import {ChipModule} from "primeng/chip";
import {NgForOf, NgStyle} from "@angular/common";
import {AccordionModule} from "primeng/accordion";
import {BadgeModule} from "primeng/badge";
import {DividerModule} from "primeng/divider";
import {ViewsDownloadsService} from "../../services/views-downloads/views-downloads.service";
import {TypeViewDownload} from "../../interface/enums";
import {MarkdownComponent} from "../../component/markdown/markdown.component";

@Component({
    selector: 'app-view-algorithm',
    // standalone: true,
    // imports: [
    //     AvatarModule,
    //     ButtonModule,
    //     DropdownModule,
    //     FileUploadModule,
    //     InputTextModule,
    //     InputTextareaModule,
    //     PaginatorModule,
    //     PanelModule,
    //     SharedModule,
    //     TableModule,
    //     TagModule,
    //     CardModule,
    //     RippleModule,
    //     ChipsModule,
    //     ChipModule,
    //     NgForOf,
    //     AccordionModule,
    //     BadgeModule,
    //     DividerModule,
    //     NgStyle
    // ],
    templateUrl: './view-algorithm.component.html',
    styleUrl: './view-algorithm.component.scss'
})
export class ViewAlgorithmComponent implements OnInit, AfterViewInit {

    public scriptTypeList: BasicEntity[] = [];
    public operativeSystemList: BasicEntity[] = [];
    public toolList: BasicEntity[] = [];
    public tecnologiasList: BasicEntity[] = [];
    public authorsList: Author[] = [];

    public scriptsList: Script[] = [];
    public scriptsItem: Script = {} as Script;

    public archivoSeleccionado: File[] = [];

    public viewDownloadFlag: any = {views: false, downloads: false};

    constructor(private productService: ProductService,
                public layoutService: LayoutService,
                private scriptService: ScriptService,
                private scriptTypeService: ScriptTypeService,
                private operativeSystemService: OperativeSystemService,
                private toolService: ToolService,
                private tecnologyService: TecnologyService,
                private authorService: AuthorService,
                private viewsDownloadsService: ViewsDownloadsService,
                private router: Router,
                private route: ActivatedRoute,
    ) {
    }

    ngAfterViewInit(): void {
    }

    ngOnInit(): void {
        this.scriptsItem.scriptType = {};
        this.scriptsItem.tool = {};
        this.scriptsItem.operativeSystem = {};
        this.scriptsItem.authors = [];
        this.scriptsItem.tecnology = [];
        this.loadInfo();
    }

    async loadInfo() {
        const [
            scriptTypeList,
            operativeSystemList,
            toolList,
            tecnologiasList,
            authorsList
        ] = await Promise.all([
            this.scriptTypeService.getList(),
            this.operativeSystemService.getList(),
            this.toolService.getList(),
            this.tecnologyService.getList(),
            this.authorService.getList()
        ]);

        this.scriptTypeList = scriptTypeList;
        this.operativeSystemList = operativeSystemList;
        this.toolList = toolList;
        this.tecnologiasList = tecnologiasList;
        this.authorsList = authorsList;

        this.scriptService.setPropesties(scriptTypeList,
            operativeSystemList,
            toolList,
            tecnologiasList,
            authorsList);


        const id: string = this.route.snapshot.paramMap.get('id');
        if (!Global.isNullOrUndefined(id)) {
            this.scriptsItem = await this.scriptService.getByIdTurbo(id);
            this.scriptsItem.fileData = await this.scriptService.getFileList(this.scriptsItem.id)
            // this.scriptsItem = await this.scriptService.getById(id);
            // console.log('holi', this.scriptsItem);
            await this.incrementViews();
        }


    }

    onFileSelect(event: any): void {
        if (event.currentFiles.length > 0) {
            this.archivoSeleccionado = event.currentFiles;
            console.log('Archivo seleccionado:', this.archivoSeleccionado);
        }
    }

    saveItem() {
        this.scriptService.saveFile(this.scriptsItem.id, this.archivoSeleccionado);
    }

    async cancel() {
    }

    async downloadItem(item: any) {
        console.log(' downloadItem', item);
        this.scriptService.downloadFile(item.url, item.name);
        //     const url = window.URL.createObjectURL(item.blob);
        //     const a = document.createElement('a');
        //     a.href = url;
        //     a.download = item.name;
        //     document.body.appendChild(a);
        //     a.click();
        //     document.body.removeChild(a);
        //     window.URL.revokeObjectURL(url);
        await this.incrementDownloads();
    }

    async incrementViews() {
        if (!this.viewDownloadFlag.views) {
            const script = await this.scriptService.getById(this.scriptsItem.id);
            script.views = (script.views ?? 0) + 1;
            await this.scriptService.persist(script, script.id);
            this.viewDownloadFlag.views = true;
            // guardar el registro de la visita
            await this.saveViewDownload(script.id, TypeViewDownload.VIEW);
        }
    }

    async incrementDownloads() {
        if (!this.viewDownloadFlag.downloads) {
            const script = await this.scriptService.getById(this.scriptsItem.id);
            script.downloads = (script.downloads ?? 0) + 1;
            await this.scriptService.persist(script, script.id);
            this.viewDownloadFlag.downloads = true;
            // guardar el registro de la descarga
            await this.saveViewDownload(script.id, TypeViewDownload.DOWNLOAD);

        }
    }

    async saveViewDownload(uidScript: string, type: string): Promise<void> {
        const itemDownload: ViewsDownloads = {
            uid_script: uidScript,
            date: new Date(),
            type: type
        };
        //.toISOString(),
        await this.viewsDownloadsService.persist(itemDownload, '');
    }


}
