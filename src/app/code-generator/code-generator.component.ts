import { AfterViewChecked, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CodeGeneratorService } from '../shared/services/code-generator.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-code-generator',
  templateUrl: './code-generator.component.html',
  styleUrls: ['./code-generator.component.css'],
  standalone: false
})

export class CodeGeneratorComponent implements AfterViewChecked {
  prompt: string = '';
  generatedHtml: string = '';
  generatedCss: string = '';
  generatedJs: string = '';
  viewMode: 'code' | 'preview' = 'preview'; // Default mode
  activeTab: 'html' | 'css' | 'js' = 'html'; // Default tab

  @ViewChild('previewContainer', { static: false }) previewContainer!: ElementRef;

  private isPreviewRendered = false;

  constructor(private codeGeneratorService: CodeGeneratorService) {}

  ngAfterViewChecked() {
    // Ensure the preview is rendered when switching back to "Preview" mode
    if (this.viewMode === 'preview' && this.previewContainer && !this.isPreviewRendered) {
      this.renderPreview();
    }
  }

  generateCode() {
    if (!this.prompt.trim()) {
      alert('Please enter a prompt!');
      return;
    }

    this.codeGeneratorService.generateCode(this.prompt).subscribe({
      next: (response: any) => {
        const text = response?.html?.response?.candidates[0]?.content?.parts[0]?.text || '';
        this.extractCode(text);
        if (this.viewMode === 'preview') {
          this.renderPreview();
        }
      },
      error: (err) => {
        console.error('Error generating code:', err);
        alert('An error occurred. Please try again.');
      },
    });
  }

  extractCode(text: string) {
    this.generatedHtml = this.extractSection(text, 'html');
    this.generatedCss = this.extractSection(text, 'css');
    this.generatedJs = this.extractSection(text, 'jsx');
  }

  extractSection(text: string, type: string): string {
    const match = text.match(new RegExp(`\\\`\\\`${type}\\n([\\s\\S]*?)\\\`\\\``));
    return match ? match[1] : '';
  }

  renderPreview() {
    if (this.previewContainer) {
      const previewElement = this.previewContainer.nativeElement;
      const shadowRoot = previewElement.shadowRoot || previewElement.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = `
        <style>${this.generatedCss}</style>
        ${this.generatedHtml}
      `;
      this.isPreviewRendered = true;
    }
  }

  setViewMode(mode: 'code' | 'preview') {
    this.viewMode = mode;

    // Reset the preview render flag when switching tabs
    if (mode === 'preview') {
      this.isPreviewRendered = false;
    }
  }

  setActiveTab(tab: 'html' | 'css' | 'js') {
    this.activeTab = tab;
  }
}