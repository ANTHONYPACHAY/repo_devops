import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {marked} from "marked";
import {FileData} from "../../interface/models";
import {TypeFile} from "../../interface/enums";

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

    constructor() {
    }

    async ngOnChanges(changes: SimpleChanges) {
        const param = changes['fileInput'];
        if (param) {
            this.readFileContent(param.currentValue);
        }
    }

    readFileContent(file: FileData): void {
        const reader = new FileReader();
        reader.onload = async () => {
            const fileContent = reader.result as string;
            console.log(fileContent);
            if (file.name.endsWith('.md')) {
                this.type = TypeFile.MARKDOWN;
                this.convertedMarkdown = await marked(fileContent);
            }
        };
        reader.readAsText(file.blob);
    }

    isMarkDown() {
        return this.type === TypeFile.MARKDOWN;
    }
}
