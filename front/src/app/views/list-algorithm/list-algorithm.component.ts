import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Author, BasicEntity, Script} from "../../interface/models";
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
import {TypeOrder} from "../../interface/enums";
import {PanelModule} from "primeng/panel";
import {Table, TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-list-algorithm',
    standalone: true,
    imports: [
        PanelModule,
        TableModule,
        ButtonModule,
        RippleModule,
        DropdownModule,
        FormsModule
    ],
    templateUrl: './list-algorithm.component.html',
    styleUrl: './list-algorithm.component.scss'
})
export class ListAlgorithmComponent implements OnInit, AfterViewInit {

    public scriptTypeList: BasicEntity[] = [];
    public operativeSystemList: BasicEntity[] = [];
    public toolList: BasicEntity[] = [];
    public tecnologiasList: BasicEntity[] = [];
    public authorsList: Author[] = [];

    public scriptsList: Script[] = [];
    public scriptsItem: Script = {} as Script;

    @ViewChild('dt') table: Table;


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


        this.scriptsList = await this.scriptService.getListTurbo("tittle", TypeOrder.ASC);
        console.log('this.scriptsList', this.scriptsList);

        this.route.queryParams.subscribe(params => {
            console.log('queryParams', params);
            const filterBy = params['filterBy']; // 'tool.entity.description'
            const value = params['value'];
            this.table.filter(value, filterBy, 'contains');
        })

    }

    async cancel() {
    }

    getFormattedDate(seconds: number, nanoseconds: number): string {
        const date = new Date(seconds * 1000 + nanoseconds / 1000000);
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }

    gotoView(item: Script) {
        this.router.navigate(['view-algorithm', item.id]);
    }



}
