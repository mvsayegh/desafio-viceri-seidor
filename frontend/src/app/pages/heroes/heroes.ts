import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Component, OnInit, ViewChild, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { TextareaModule } from 'primeng/textarea';
import { HeroService } from '../../core/service/heroes.service';
import { Hero } from '../../core/models/heroes.model';
import { Superpower } from '../../core/models/superpower.model';
import { SuperpowerService } from '../../core/service/superpowers.service';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageModule } from 'primeng/message';
@Component({
    selector: 'app-heroes',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CheckboxModule,
        InputNumberModule,
        TableModule,
        ButtonModule,
        ToolbarModule,
        RippleModule,
        ToastModule,
        TagModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        DialogModule,
        FormsModule,
        ConfirmDialogModule,
        FileUploadModule,
        TextareaModule,
        MultiSelectModule,
        DatePickerModule,
        MessageModule
    ],
    providers: [MessageService, ConfirmationService],
    template: `
        <p-toolbar styleClass="mb-2">
            <ng-template #start>
                <h3 class="m-0">Gerenciar Heróis</h3>
            </ng-template>
            <ng-template #end>
                <p-button icon="pi pi-plus" label="Novo" (click)="openNew()" class="mr-2" />
                <p-button icon="pi pi-external-link" label="Exportar" (click)="dt.exportCSV()" />
            </ng-template>
        </p-toolbar>
        <div class="card">
            <p-table
                #dt
                [value]="heroes() || []"
                [columns]="cols"
                [paginator]="true"
                [rows]="10"
                [rowsPerPageOptions]="[3, 5, 10]"
                [exportHeader]="'Exportar'"
                [globalFilterFields]="['nome', 'nomeHeroi']"
                [showCurrentPageReport]="true"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
                [tableStyle]="{ 'min-width': '60rem' }"
                dataKey="_id"
            >
                <ng-template #caption>
                    <div class="flex items-center justify-between">
                        <span class="font-semibold">Listagem de heróis</span>
                        <p-iconfield>
                            <p-inputicon styleClass="pi pi-search" />
                            <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Buscar..." />
                        </p-iconfield>
                    </div>
                </ng-template>

                <ng-template #header let-columns>
                    <tr>
                        @for (col of columns; track col.header) {
                            <th>
                                {{ col.header }}
                            </th>
                        }
                        <th style="width: 120px">Ações</th>
                    </tr>
                </ng-template>

                <ng-template #body let-hero let-columns="columns">
                    <tr>
                        @for (col of columns; track col.field) {
                            <td>
                                @switch (col.field) {
                                    @case ('superpoderId') {
                                        @for (power of getSuperpowerTags(hero.superpoderId); track power.name) {
                                            <p-tag [value]="power.name" class="mr-2 mb-1 inline-block" [severity]="power.severity"> </p-tag>
                                        }
                                    }
                                    @case ('dataNascimento') {
                                        {{ !hero.dataNascimento ? 'Desconhecida' : (hero.dataNascimento | date: 'dd/MM/yyyy') }}
                                    }
                                    @case ('altura') {
                                        {{ hero.altura ? (hero.altura | number: '1.2-2') + ' m' : '-' }}
                                    }
                                    @case ('peso') {
                                        {{ hero.peso ? (hero.peso | number: '1.0-0') + ' kg' : '-' }}
                                    }
                                    @default {
                                        {{ hero[col.field] }}
                                    }
                                }
                            </td>
                        }
                        <td>
                            <p-button icon="pi pi-pencil" class="mr-2" (click)="editHero(hero)" />
                            <p-button icon="pi pi-trash" severity="danger" (click)="confirmDeleteHero(hero)" />
                        </td>
                    </tr>
                </ng-template>
                <ng-template #emptymessage>
                    <tr>
                        <td [attr.colspan]="cols.length + 1" class="text-center py-4 text-surface-500">Nenhum registro encontrado</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
        <p-dialog header="{{ heroDialogTitle }}" [(visible)]="heroDialog" [modal]="true" [style]="{ width: '450px' }" [closeOnEscape]="true" [dismissableMask]="true">
            <form [formGroup]="heroForm">
                <div class="flex flex-col gap-4">
                    <!-- Nome -->
                    <label for="name" class="font-bold">Nome</label>
                    <input id="name" type="text" pInputText required formControlName="nome" name="nome" />

                    @if (heroForm.get('nome')?.invalid && (heroForm.get('nome')?.dirty || heroForm.get('nome')?.touched)) {
                        <div class="alert">
                            @if (heroForm.get('nome')?.hasError('required')) {
                                <p-message severity="error" size="small" variant="simple">O nome é obrigatório.</p-message>
                            }
                            @if (heroForm.get('nome')?.hasError('maxlength')) {
                                <p-message severity="error" size="small" variant="simple">Máximo de 100 caracteres.</p-message>
                            }
                        </div>
                    }

                    <!-- Nome Herói -->
                    <label for="nameSuperHero" class="font-bold">Nome Super Herói</label>
                    <input id="nameSuperHero" type="text" required pInputText formControlName="nomeHeroi" name="nomeHeroi" />
                    @if (heroForm.get('nomeHeroi')?.invalid && (heroForm.get('nomeHeroi')?.dirty || heroForm.get('nomeHeroi')?.touched)) {
                        <div class="alert">
                            @if (heroForm.get('nomeHeroi')?.hasError('required')) {
                                <p-message severity="error" size="small" variant="simple">O nome do herói é obrigatório.</p-message>
                            }
                            @if (heroForm.get('nomeHeroi')?.hasError('maxlength')) {
                                <p-message severity="error" size="small" variant="simple">Máximo de 100 caracteres.</p-message>
                            }
                        </div>
                    }

                    <!-- Superpoderes -->
                    <label for="superpowers" class="font-bold">Superpoderes</label>
                    <p-multiSelect [options]="superpowers()" required formControlName="superpoderId" optionLabel="superpoderNome" optionValue="id" placeholder="Selecione um ou mais poderes" display="chip" class="w-full"></p-multiSelect>
                    @if (heroForm.get('superpoderId')?.invalid && (heroForm.get('superpoderId')?.dirty || heroForm.get('superpoderId')?.touched)) {
                        <div class="alert">
                            @if (heroForm.get('superpoderId')?.hasError('required')) {
                                <p-message severity="error" size="small" variant="simple">Selecione pelo menos um superpoder.</p-message>
                            }
                            @if (heroForm.get('superpoderId')?.hasError('minlength')) {
                                <p-message severity="error" size="small" variant="simple">Selecione pelo menos um superpoder.</p-message>
                            }
                        </div>
                    }

                    <!-- Altura e Peso -->
                    <div class="flex gap-4">
                        <div class="flex-1">
                            <label for="altura" class="font-bold">Altura</label>
                            <p-inputNumber id="altura" required formControlName="altura" name="altura" [min]="0" [max]="5" mode="decimal" [maxFractionDigits]="2" [minFractionDigits]="2" [locale]="'pt-BR'" class="w-full" />
                            @if (heroForm.get('altura')?.invalid && (heroForm.get('altura')?.dirty || heroForm.get('altura')?.touched)) {
                                <div class="alert">
                                    @if (heroForm.get('altura')?.hasError('required')) {
                                        <p-message severity="error" size="small" variant="simple">O campo altura é obrigatório.</p-message>
                                    }
                                    @if (heroForm.get('altura')?.hasError('min')) {
                                        <p-message severity="error" size="small" variant="simple">Valor mínimo: 0.5 m</p-message>
                                    }
                                    @if (heroForm.get('altura')?.hasError('max')) {
                                        <p-message severity="error" size="small" variant="simple">Valor máximo: 3 m</p-message>
                                    }
                                </div>
                            }
                        </div>
                        <div class="flex-1">
                            <label for="peso" class="font-bold">Peso</label>
                            <p-inputNumber id="peso" required formControlName="peso" name="peso" [min]="0" [max]="500" mode="decimal" class="w-full" />
                            @if (heroForm.get('peso')?.invalid && (heroForm.get('peso')?.dirty || heroForm.get('peso')?.touched)) {
                                <div class="alert">
                                    @if (heroForm.get('peso')?.hasError('required')) {
                                        <p-message severity="error" size="small" variant="simple">O campo peso é obrigatório.</p-message>
                                    }
                                    @if (heroForm.get('peso')?.hasError('min')) {
                                        <p-message severity="error" size="small" variant="simple">Valor mínimo: 0.5 m</p-message>
                                    }
                                    @if (heroForm.get('peso')?.hasError('max')) {
                                        <p-message severity="error" size="small" variant="simple">Valor máximo: 3 m</p-message>
                                    }
                                </div>
                            }
                        </div>
                    </div>

                    <!-- Data de Nascimento -->
                    <label for="dataNascimento" class="font-bold">Data de Nascimento</label>
                    <p-datepicker [showIcon]="true" inputId="buttondisplay" [showOnFocus]="false" id="dataNascimento" formControlName="dataNascimento" name="dataNascimento" dateFormat="dd/mm/yy" appendTo="body" class="w-full"> </p-datepicker>
                </div>
            </form>
            <ng-template pTemplate="footer">
                <p-button label="Cancelar" icon="pi pi-times" severity="secondary" (click)="hideDialog()" />
                <p-button [label]="heroForm.value.id ? 'Alterar' : 'Criar'" [disabled]="heroForm.invalid" icon="pi pi-check" (click)="saveHero()" />
            </ng-template>
        </p-dialog>

        <p-toast />
        <p-confirmdialog />
    `
})
export class HeroesPage implements OnInit {
    private service = inject(HeroService);
    private superpowerService = inject(SuperpowerService);
    private messageService = inject(MessageService);
    private confirmationService = inject(ConfirmationService);
    private fb = inject(FormBuilder);

    heroForm!: FormGroup;
    heroes = signal<Hero[]>([]);
    superpowers = signal<Superpower[]>([]);
    heroDialog = false;
    heroDialogTitle = 'Novo Herói';
    hero: Partial<Hero> = {};

    cols = [
        { field: 'id', header: 'ID' },
        { field: 'nome', header: 'Nome' },
        { field: 'nomeHeroi', header: 'Nome Herói' },
        { field: 'superpoderId', header: 'Super Poderes' },
        { field: 'dataNascimento', header: 'Data de nascimento' },
        { field: 'altura', header: 'Altura' },
        { field: 'peso', header: 'Peso' }
    ];

    @ViewChild('dt') dt!: Table;

    ngOnInit(): void {
        this.initForm();
        this.loadHeroes();
        this.loadSuperpowers();
    }

    initForm() {
        this.heroForm = this.fb.group({
            id: [0],
            nome: ['', [Validators.required, Validators.maxLength(100)]],
            nomeHeroi: ['', [Validators.required, Validators.maxLength(100)]],
            superpoderId: [[], [Validators.required, Validators.minLength(1)]],
            dataNascimento: [null, [this.validarIdade]],
            altura: [null, [Validators.min(0.5), Validators.max(3)]],
            peso: [null, [Validators.min(1), Validators.max(500)]]
        });
    }

    loadHeroes(): void {
        this.service.getAll().subscribe({
            next: (res: any) => {
                this.heroes.set(res.data);
            },
            error: () =>
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Falha ao carregar heróis'
                })
        });
    }

    loadSuperpowers(): void {
        this.superpowerService.getAll().subscribe({
            next: (res: any) => {
                this.superpowers.set(res.data);
            },
            error: () =>
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Falha ao carregar superpoderes'
                })
        });
    }

    getSuperpowerTags(superpoderIds: number[]) {
        if (!Array.isArray(superpoderIds)) {
            return [];
        }

        return superpoderIds.map((id) => {
            const found = this.superpowers().find((sp) => sp.id === id);

            if (found) {
                return {
                    name: found.superpoderNome, // Nome do backend
                    severity: this.getSeverityById(found.id)
                };
            }

            return { name: 'Desconhecido', severity: 'danger' };
        });
    }

    getSeverityById(id: number): string {
        switch (id) {
            case 1:
                return 'success';
            case 2:
                return 'info';
            case 3:
                return 'warn';
            default:
                return 'secondary';
        }
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.heroDialogTitle = 'Novo Herói';
        this.heroDialog = true;
        this.heroForm.reset();
    }

    editHero(hero: any) {
        this.heroForm.patchValue({ ...hero });
        const dataConvertida = hero.dataNascimento ? new Date(hero.dataNascimento) : null;
        this.heroForm.patchValue({
            ...hero,
            dataNascimento: dataConvertida
        });
        this.heroDialogTitle = 'Editar Herói';
        this.heroDialog = true;
    }

    hideDialog() {
        this.heroDialog = false;
    }

    saveHero() {
        if (this.heroForm.invalid) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Validação',
                detail: 'Preencha os campos obrigatórios'
            });
            return;
        }
        // Função local para limpar campos inválidos
        const sanitizeRecord = (record: any, isUpdate: boolean) => {
            const { __typename, _id, id, ...rest } = record;
            if (!isUpdate) {
                delete rest.id;
            }
            if (!rest.dataNascimento) {
                delete rest.dataNascimento;
            } else if (rest.dataNascimento instanceof Date) {
                rest.dataNascimento = rest.dataNascimento.toISOString();
            } else if (typeof rest.dataNascimento === 'string') {
                const parsedDate = new Date(rest.dataNascimento);
                rest.dataNascimento = isNaN(parsedDate.getTime()) ? undefined : parsedDate.toISOString();
            }
            return rest;
        };
        if (this.heroForm.value.id) {
            // Atualizar herói
            const record = sanitizeRecord(this.heroForm.value, true);
            this.service.update(this.heroForm.value.id, record).subscribe({
                next: (res: any) => {
                    if (!res.success) {
                        return this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: res.message || 'Falha ao atualizar herói'
                        });
                    }
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: res.message || 'Herói atualizado com sucesso'
                    });
                    this.loadHeroes();
                    this.heroDialog = false;
                },
                error: (error: any) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro',
                        detail: error.error?.message || 'Falha ao atualizar herói'
                    });
                }
            });
        } else {
            // Criar herói
            const record = sanitizeRecord(this.heroForm.value, false);
            this.service.create(record).subscribe({
                next: (res: any) => {
                    if (!res.success) {
                        return this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: res.message || 'Falha ao atualizar herói'
                        });
                    }
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Criado',
                        detail: res.message || 'Herói criado com sucesso!'
                    });
                    this.loadHeroes();
                    this.heroDialog = false;
                },
                error: (error: any) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro',
                        detail: error.error?.message || 'Falha ao criar herói'
                    });
                }
            });
        }
    }

    confirmDeleteHero(hero: any) {
        this.confirmationService.confirm({
            message: `Você tem certeza que deseja excluir o herói "${hero.nomeHeroi}"?`,
            header: 'Confirmar',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            rejectIcon: 'pi pi-times',
            rejectButtonStyleClass: 'p-button-danger',
            acceptIcon: 'pi pi-check',
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.deleteHero(hero.id)
        });
    }

    deleteHero(id: number) {
        this.service.delete(id).subscribe({
            next: (res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Deletado', detail: res.message || 'Herói deletado com sucesso' });
                this.loadHeroes();
            },
            error: (error: any) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: error.error?.message || 'Falha ao deletar herói'
                });
            }
        });
    }

    private validarIdade(control: AbstractControl) {
        const data = control.value;
        if (!data) return null;
        const idade = new Date().getFullYear() - new Date(data).getFullYear();
        if (idade < 0) return { idadeInvalida: true };
        return null;
    }
}
