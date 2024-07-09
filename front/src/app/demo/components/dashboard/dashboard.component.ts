import {Component, OnInit, OnDestroy} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Product} from '../../api/product';
import {ProductService} from '../../service/product.service';
import {Subscription, debounceTime} from 'rxjs';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {ScriptService} from "../../../services/script/script.service";
import {Author, BasicEntity, DtoBasicEntity, Script} from "../../../interface/models";
import {Global} from "../../../utils/Global";
import {ScriptTypeService} from "../../../services/script-type/script-type.service";
import {OperativeSystemService} from "../../../services/operative-system/operative-system.service";
import {ToolService} from "../../../services/tool/tool.service";
import {TecnologyService} from "../../../services/tecnology/tecnology.service";
import {AuthorService} from "../../../services/author/author.service";
import {TypeOrder} from "../../../interface/enums";
import {Router} from "@angular/router";

@Component({
    templateUrl: './dashboard.component.html',
    styles: '.small-button {\n' +
        '  font-size: 10px;  /* Ajusta el tamaño del texto */\n' +
        '  padding: 2px 5px; /* Ajusta el relleno del botón */\n' +
        '}'
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    counterList: any[];


    private scriptTypeList: BasicEntity[] = [];
    private operativeSystemList: BasicEntity[] = [];
    public toolList: BasicEntity[] = [];
    private tecnologiasList: BasicEntity[] = [];
    private authorsList: Author[] = [];

    public scriptsList: Script[] = [];
    public scriptsListTotal: Script[] = [];

    constructor(private productService: ProductService,
                public layoutService: LayoutService,
                private scriptService: ScriptService,
                private scriptTypeService: ScriptTypeService,
                private operativeSystemService: OperativeSystemService,
                private toolService: ToolService,
                private tecnologyService: TecnologyService,
                private authorService: AuthorService,
                private router: Router,
    ) {


        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {
                this.initChart();
            });
    }

    ngOnInit() {
        this.initCounters();
        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            {label: 'Add New', icon: 'pi pi-fw pi-plus'},
            {label: 'Remove', icon: 'pi pi-fw pi-minus'}
        ];
        // this.generateData();
        this.initDashboard();


    }

    async initDashboard() {
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

        const resp = await this.scriptService.getListTurbo("date_register", TypeOrder.DESC);
        console.log('getListTurbo', resp);
        this.scriptsListTotal = resp;
        this.scriptsList = resp.slice(0, 5);

        for (let ind = 0; ind < this.counterList.length; ind++) {
            const listitems = Global.searchItemsInArray3Params(resp,
                'scriptType', 'entity', 'description',
                this.counterList[ind].detail);
            this.counterList[ind].quantity = listitems.length;
            this.counterList[ind].id = listitems[0].scriptType.id;
        }

        const listColors = ['orange', 'cyan', 'pink', 'green', 'purple', 'teal'];
        for (let ind = 0; ind < this.toolList.length; ind++) {
            this.toolList[ind].color = listColors[ind % listColors.length];
            this.toolList[ind].numUses = Global.searchItemsInArray3Params(resp,
                'tool', 'entity', 'description',
                this.toolList[ind].description).length;
        }
        console.log('this.toolList', this.toolList);

    }

    gotoView(item: Script) {
        this.router.navigate(['view-algorithm', item.id]);
    }

    generateData() {

        this.scriptService.getJsonData().subscribe(async (resp) => {
            console.log('data', resp);
            const data = resp.data as any[];

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


            console.log('scriptTypeList', scriptTypeList);
            console.log('operativeSystemList', operativeSystemList);
            console.log('toolList', toolList);
            console.log('tecnologiasList', tecnologiasList);
            console.log('authorsList', authorsList);

            const resultElement: Script[] = [];
            for (const item of data) {

                /**
                 * SCRIPT TYPE
                 */
                let itemScript: Script = {} as Script;

                itemScript.tittle = item.tittle;
                itemScript.description = item.description;
                itemScript.views = 0;
                itemScript.downloads = 0;
                itemScript.valid = true;
                itemScript.date_register = new Date();

                let itemScriptType: BasicEntity = {
                    code: '',
                    description: item.scriptType?.toString().toUpperCase()
                }
                let findItemScriptType = Global.filtrar(scriptTypeList, 'description', itemScriptType.description);
                if (findItemScriptType.length > 0) {
                    itemScript.scriptType = {
                        id: findItemScriptType[0].id,
                        // entity: findItemScriptType[0]
                    }
                }

                /**
                 * OPERATIVE SYSTEM
                 */
                let itemOperativeSystem: BasicEntity = {
                    code: '',
                    description: item.operativeSystem?.toString().toUpperCase()
                }
                let findItemOperativeSystem = Global.filtrar(operativeSystemList, 'description', itemOperativeSystem.description);
                if (findItemOperativeSystem.length > 0) {
                    itemScript.operativeSystem = {
                        id: findItemOperativeSystem[0].id,
                        // entity: findItemOperativeSystem[0]
                    }
                }

                /**
                 * TECNOLOGIA
                 */
                itemScript.tecnology = [];

                for (const itemTecnologia of item['Tecnologías']) {

                    let itemTecnologias: BasicEntity = {
                        code: itemTecnologia.code?.toString().toUpperCase(),
                        description: itemTecnologia.description?.toString().toUpperCase()
                    }
                    // if (Global.filtrar(tecnologiasList, 'description', itemTecnologias.code).length === 0) {
                    //     tecnologiasList.push(itemTecnologias)
                    // }

                    let findItemTecnologias = Global.filtrar(tecnologiasList, 'description', itemTecnologias.code);
                    if (findItemTecnologias.length > 0) {
                        itemScript.tecnology.push({
                            id: findItemTecnologias[0].id,
                            // entity: findItemTecnologias[0]
                        });
                    }
                }

                /**
                 * TOOLS
                 */
                let itemTool: BasicEntity = {
                    code: item.tool,
                    description: item.tool?.toString().toUpperCase()
                }
                // console.log(Global.filtrar(toolList, 'description', itemTool.description));
                // if (Global.filtrar(toolList, 'description', itemTool.description).length === 0) {
                //     toolList.push(itemTool)
                // }
                let findItemTool = Global.filtrar(toolList, 'description', itemTool.description);
                if (findItemTool.length > 0) {
                    itemScript.tool = {
                        id: findItemTool[0].id,
                        // entity: findItemTool[0]
                    }
                }

                /**
                 * AUTHOR
                 */
                let itemAutor: Author = {
                    email: item.authors[0].email?.toString().toLowerCase(),
                    firstName: item.authors[0].firstName?.toString().toUpperCase(),
                    lastName: item.authors[0].lastName?.toString().toUpperCase()
                }
                // if (Global.filtrar(authorsList, 'email', itemAutor.email).length === 0) {
                //     authorsList.push(itemAutor)
                // }
                itemScript.authors = [];
                let findItemAutor = Global.filtrar(authorsList, 'email', itemAutor.email);
                if (findItemAutor.length > 0) {
                    itemScript.authors.push({
                        id: findItemAutor[0].id,
                        // entity: findItemAutor[0]
                    });
                }

                resultElement.push(itemScript);
                this.scriptService.persist(itemScript);
            }

            // console.log('scriptTypeList', scriptTypeList);
            // console.log('operativeSystemList', operativeSystemList);
            // console.log('toolList', toolList);
            // console.log('tecnologiasList', tecnologiasList);
            // console.log('authorsList', authorsList);
            console.log('resultElement', resultElement);
            // for (const item of scriptTypeList) {
            //     this.scriptTypeService.persist(item);
            // }
            // for (const item of operativeSystemList) {
            //     this.operativeSystemService.persist(item);
            // }
            // for (const item of toolList) {
            //     this.toolService.persist(item);
            // }
            //
            // for (const item of tecnologiasList) {
            //     this.tecnologyService.persist(item);
            // }
            // for (const item of authorsList) {
            //     this.authorService.persist(item);
            // }

        });
    }

    initCounters() {
        this.counterList = [
            {
                label: 'Automatización',
                detail: 'AUTOMATIZACIÓN Y GESTIÓN DE CONFIGURACIÓN',
                quantity: 0,
                icon: 'pi pi-cog',
                iconColor: 'text-green-500',
                badgeColor: 'bg-blue-100',
                url: ''
            },
            {
                label: 'Infraestructura',
                detail: 'GESTIÓN DE INFRAESTRUCTURA Y ENTORNOS',
                quantity: 0,
                icon: 'pi pi-server',
                iconColor: 'text-green-500',
                badgeColor: 'bg-green-100',
                url: ''
            },
            {
                label: 'Contenerización',
                detail: 'CONTENERIZACIÓN Y AUTOMATIZACIÓN DE TAREAS',
                quantity: 0,
                icon: 'pi pi-box',
                iconColor: 'text-orange-500',
                badgeColor: 'bg-orange-100',
                url: ''
            }
        ];
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [
                {
                    label: 'Visitas',
                    data: [0, 0, 0, 0, 0, 10, 40, 0, 0, 0, 0, 0],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Descargas',
                    data: [0, 0, 0, 0, 0, 8, 26, 0, 0, 0, 0, 0],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    viewUses(filterBy, item) {
        this.router.navigate(['/list-algorithm'], {
            queryParams: {filterBy: filterBy, value: item}
        });
    }
}
