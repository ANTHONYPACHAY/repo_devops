import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {marked} from "marked";
import {FileData} from "../../interface/models";
import {TypeFile} from "../../interface/enums";
import {ScriptService} from "../../services/script/script.service";

@Component({
  selector: 'app-markdown',
  // standalone: true,
  // imports: [],
  templateUrl: './markdown.component.html',
  styleUrl: './markdown.component.scss'
})
export class MarkdownComponent  implements OnChanges {
    @Input() fileInput: FileData;
    convertedMarkdown: string;
    type: string;

    editorOptions = { theme: 'vs-dark', language: 'typescript' };

    constructor(private scriptService: ScriptService) {
    }

    async ngOnChanges(changes: SimpleChanges) {
        const param = changes['fileInput'];
        if (param) {
            this.readFileContent(param.currentValue);
        }
    }

    async readFileContent(file: FileData) {
        let resp = await this.scriptService.readFile(file.url).toPromise();
        console.log('readFileContent', resp);
        const reader = new FileReader();
        reader.onload = async () => {
            const fileContent = reader.result as string;
            console.log('fileContent', fileContent);
            if (file.name.endsWith('.md')) {
                this.type = TypeFile.MARKDOWN;
                this.convertedMarkdown = await marked(fileContent);
            } else {
                this.type = TypeFile.CODE;
                this.convertedMarkdown = fileContent;
            }
        };
        reader.readAsText(resp);
    }

    isMarkDown() {
        return this.type === TypeFile.MARKDOWN;
    }
    isCode() {
        return this.type === TypeFile.CODE;
    }
}
