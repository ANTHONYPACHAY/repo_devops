import {DatePipe} from "@angular/common";

export class Global {

    /*
    *  variables de los roles
    * */

    public static vistasDocente = [
        'view-dashboard', 'resource-view', 'resource-manage-verbs', 'resource-manage-adverbs', 'resource-manage-video', 'resource-manage-documents', 'view-monitorear'
    ];
    public static vistasAdministrador = [];
    public static vistasAprendiz = [
        'view-dashboard', 'resource-view', 'view-practice', 'view-progreso'
    ];

    /* eventos generales */
    public static contarClaves(data: any): number {
        if(data === undefined)
            return 0;
        return Object.keys(data).length;
    }

    public static isNullOrUndefined(data: any): boolean {
        return data === null || data === undefined;
    }

    public static castDate(datePipe: DatePipe, fecha: string | Date): string {
        if(this.isNullOrUndefined(fecha)) {
            return '';
        } else {
            let tmpDate;
            if (typeof fecha === 'string') {
                tmpDate = new Date(fecha)
            } else {
                tmpDate = fecha;
            }
            return datePipe.transform(tmpDate, 'dd-MM-yyy hh:mm')!;
        }
    }

    public static castDateF2(datePipe: DatePipe, fecha: string | Date): string {
        if(this.isNullOrUndefined(fecha)) {
            return '';
        } else {
            let tmpDate;
            if (typeof fecha === 'string') {
                tmpDate = new Date(fecha);
            } else {
                tmpDate = fecha;
            }
            return datePipe.transform(tmpDate, 'yyy-MM-dd hh:mm:ss')!;
        }
    }

    public static castDateF3(datePipe: DatePipe, fecha: string | Date): string {
        if(this.isNullOrUndefined(fecha)) {
            return '';
        } else {
            let tmpDate;
            if (typeof fecha === 'string') {
                tmpDate = new Date(fecha);
            } else {
                tmpDate = fecha;
            }
            return datePipe.transform(tmpDate, 'yyy-MM-dd')!;
        }
    }

    public static categorizarCalificacion(valor: number, reqText: boolean = true): string {
        if (valor >= 0 && valor < 60) {
            return reqText ? 'Baja' : 'custom-text-danger';
        } else if (valor >= 60 && valor < 80) {
            return reqText ? 'Media' : 'custom-text-warning';
        } else if (valor >= 80 && valor < 101) {
            return reqText ? 'Alta' : 'custom-text-success';
        } else {
            return reqText ? 'Muy Alta' : 'custom-text-primary';
        }
        return 'error';
    }

    public static getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static milisegundos2StringDate(tiempo: number, incluyeHoras = false): string {
        const seconds = Math.floor(tiempo / 1000) % 60;
        const minutes = Math.floor(tiempo / 60000) % 60;
        const hours = Math.floor(tiempo / 3600000);
        if (incluyeHoras) {
            return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
        } else {
            return `${Global.pad(minutes)}:${Global.pad(seconds)}`;
        }
    }

    public static calcularDiasDiferencia(fechaAnterior: Date, fechaActual: Date): number {
        const diferenciaMilisegundos = Math.abs(fechaActual.getTime() - fechaAnterior.getTime());
        return Math.floor(diferenciaMilisegundos / (1000 * 3600 * 24));
    }

    public static timestamp2Date(last_streak: any){
        const milliseconds = last_streak.seconds * 1000 + last_streak.nanoseconds / 1e6;
        return new Date(milliseconds);
    }
    public static str2Date(fechaAnteriorStr: string){
        const dateParts = fechaAnteriorStr.split(/[, :]/); // Split by delimiters
        const year = parseInt(dateParts[2]);
        const month = parseInt(dateParts[1]) - 1; // Adjust month index (0-based)
        const day = parseInt(dateParts[0]);

        return  new Date(year, month, day);
    }

    public static hanPasado24Horas(fecha: Date): boolean {
        const ahora = new Date();
        const diferenciaEnMs = ahora.getTime() - fecha.getTime();
        const horasTranscurridas = diferenciaEnMs / (1000 * 3600);
        return horasTranscurridas >= 24;
    }

    public static  fechaAyerUHoy(fecha: Date): number {
        const hoy = new Date();
        const ayer = new Date();
        ayer.setDate(hoy.getDate() - 1); // Restar un día a la fecha de hoy

        if (fecha.toDateString() === hoy.toDateString()) {
            return 2; // Hoy
        } else if (fecha.toDateString() === ayer.toDateString()) {
            return 1; // Ayer
        } else {
            return 0; // Otro día
        }
    }

    private static pad(number: number): string {
            return number < 10 ? `0${number}` : number.toString();
        }
    public static esNumero(number: string): boolean {
        return /^\d+$/.test(number);
    }

    public static searchItemInArray(itemList: any[], skey: string, find: any) {
        for (const itemElement of itemList) {
            if (itemElement[skey] === find) {
                return itemElement;
            }
        }
        return {};
    }

    public static searchItemInArray2(itemList: any[], skey1: string, skey2: string, find: any) {
        for (const itemElement of itemList) {
            if (itemElement[skey1][skey2] === find) {
                return itemElement;
            }
        }
        return {};
    }

    public static filtrar(items: any[], skey: string, condition: any): any[] {
        return items.map((item: any) => item[skey] === condition);
    }

    public static tiempoEnTexto(segundos: number) {
        let resultado = 'Hace ';
        const dias = Math.floor(segundos / (3600 * 24));
        segundos %= (3600 * 24);
        const horas = Math.floor(segundos / 3600);
        segundos %= 3600;
        const minutos = Math.floor(segundos / 60);
        segundos %= 60;

        if (dias > 0) {
            resultado += `${dias.toFixed(0)} ${dias > 1 ? 'días' : 'día'} `;
        } else if (horas > 0) {
            resultado += `${horas.toFixed(0)} ${horas > 1 ? 'horas' : 'hora'} `;
        } else if (minutos > 0) {
            resultado += `${minutos.toFixed(0)} ${minutos > 1 ? 'minutos' : 'minuto'} `;
        } else if (segundos > 0) {
            resultado += `${segundos.toFixed(0)} ${segundos !== 1 ? 'segundos' : 'segundo'}`;
        }
        return resultado;
    }

    public static calcularRacha(ultimaPractica: Date, dias: number) {
        let rachaDeAprendizaje = 0;
        const ultima = Global.fechaAyerUHoy(ultimaPractica);
        if ([1, 2].indexOf(ultima) > -1) {
            rachaDeAprendizaje = (Global.esNumero(String(dias))) ? dias : 0;
        }
        return [ultima, rachaDeAprendizaje];
    }
}
