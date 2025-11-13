import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RootComponent} from '../modules/root/root-component';
//app.component.ts
@Component({
  selector: 'app-root', //nome da tag no index.html
  imports: [RouterOutlet], //importa o router outlet (standalone)
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  titulo = "Avaliador de Projetos"; //variavel de classe
}
