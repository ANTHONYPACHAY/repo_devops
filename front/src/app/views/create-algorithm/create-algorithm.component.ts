import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PanelModule} from "primeng/panel";
import {ProductService} from "../../demo/service/product.service";
import {LayoutService} from "../../layout/service/app.layout.service";
import {ScriptService} from "../../services/script/script.service";
import {ScriptTypeService} from "../../services/script-type/script-type.service";
import {OperativeSystemService} from "../../services/operative-system/operative-system.service";
import {ToolService} from "../../services/tool/tool.service";
import {TecnologyService} from "../../services/tecnology/tecnology.service";
import {AuthorService} from "../../services/author/author.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Author, BasicEntity, Script} from "../../interface/models";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {NgClass} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FileUploadModule} from "primeng/fileupload";
import {Global} from "../../utils/Global";

@Component({
    selector: 'app-create-algorithm',
    templateUrl: './create-algorithm.component.html',
    styleUrl: './create-algorithm.component.scss'
})
export class CreateAlgorithmComponent implements OnInit, AfterViewInit {

    public scriptTypeList: BasicEntity[] = [];
    public operativeSystemList: BasicEntity[] = [];
    public toolList: BasicEntity[] = [];
    public tecnologiasList: BasicEntity[] = [];
    public tecnologiasListSelected: BasicEntity[] = [];
    public authorsList: Author[] = [];

    public scriptsList: Script[] = [];
    public scriptsItem: Script = {} as Script;

    public archivoSeleccionado: File[] = [];

    constructor(private productService: ProductService,
                public layoutService: LayoutService,
                private scriptService: ScriptService,
                private scriptTypeService: ScriptTypeService,
                private operativeSystemService: OperativeSystemService,
                private toolService: ToolService,
                private tecnologyService: TecnologyService,
                private authorService: AuthorService,
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
        this.loadInfo()
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
            console.log('holi', this.scriptsItem)
            const tecnologiesSelecteds = [];
            for (const tecnology of this.scriptsItem.tecnology) {
                tecnologiesSelecteds.push(tecnology.entity);
            }
            this.tecnologiasListSelected = tecnologiesSelecteds;
            console.log('tecnologiasListSelected', this.tecnologiasListSelected)
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


}
