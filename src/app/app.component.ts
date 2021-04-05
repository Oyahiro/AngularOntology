import { Component } from '@angular/core';
import {classes, relations, dataProperties} from '../environments/environment';
import {HttpClientService} from './providers/http-client-service';
import {FormControl} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public classesList = classes;
  public propertiesList = [];
  public selectedClasses = [];
  public selectedProperties = [];
  public classes = new FormControl();
  public properties = new FormControl();
  public dataSource = [];

  constructor(private readonly http: HttpClientService,
              private readonly translate: TranslateService) {
    translate.setDefaultLang('es');
    this.classes.valueChanges.subscribe(value => {
      this.selectedClasses.push(value);
      this.reloadClassesList(value);
      this.reloadPropertiesList();
      this.classes.setValue(null, {emitEvent: false});
    });

    this.properties.valueChanges.subscribe(values => {
      this.selectedProperties = values;
    });
  }

  public getOntologyData(): void {
    this.http.getResult(this.selectedClasses, this.selectedProperties)
      .subscribe(response => {
        this.dataSource = response;
      });
  }

  public removeLastClass(): void {
    this.getDataProperties(this.selectedClasses[this.selectedClasses.length - 1])
      .forEach(property => {
        const index = this.selectedProperties.indexOf(property, 0);
        if (index > -1) {
          this.selectedProperties.splice(index, 1);
        }
      });
    this.properties.setValue(this.selectedProperties);
    this.reloadPropertiesList();

    this.selectedClasses.pop();
    if (this.selectedClasses.length === 0) {
      this.classesList = classes;
    } else {
      this.reloadClassesList(this.selectedClasses[this.selectedClasses.length - 1]);
    }
  }

  private reloadClassesList(value: string): void {
    this.classesList = this.getRelations(value);
    this.classesList = this.classesList.filter(clazz => {
      return this.selectedClasses.indexOf(clazz) < 0;
    });
    console.log(this.selectedClasses);
  }

  private reloadPropertiesList(): void {
    this.propertiesList = [];
    this.selectedClasses.forEach(clazz => {
      this.propertiesList = this.propertiesList.concat(this.getDataProperties(clazz));
    });
  }

  private getDataProperties(key: string): string[] {
    switch (key) {
      case 'Aspirante': return dataProperties.Aspirante;
      case 'Carrera': return dataProperties.Carrera;
      case 'Examen': return dataProperties.Examen;
      case 'NotaExamen': return dataProperties.NotaExamen;
      case 'RegistroExamen': return dataProperties.RegistroExamen;
      case 'Postulacion': return dataProperties.Postulacion;
      case 'ResultadoPostulación': return dataProperties.ResultadoPostulación;
      case 'Universidad': return dataProperties.Universidad;
    }
  }

  private getRelations(key: string): string[] {
    switch (key) {
      case 'Aspirante': return relations.Aspirante;
      case 'Carrera': return relations.Carrera;
      case 'Examen': return relations.Examen;
      case 'NotaExamen': return relations.NotaExamen;
      case 'RegistroExamen': return relations.RegistroExamen;
      case 'Postulacion': return relations.Postulacion;
      case 'ResultadoPostulación': return relations.ResultadoPostulación;
      case 'Universidad': return relations.Universidad;
    }
  }
}
