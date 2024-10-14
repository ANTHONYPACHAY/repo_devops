import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkdownModule } from "./Markdown.module";  // Importa el módulo en lugar del componente
import { MarkdownComponent } from './markdown.component';

describe('MarkdownComponent', () => {
    let component: MarkdownComponent;
    let fixture: ComponentFixture<MarkdownComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MarkdownModule]  // Importa el módulo que declara MarkdownComponent
        })
            .compileComponents();

        fixture = TestBed.createComponent(MarkdownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
