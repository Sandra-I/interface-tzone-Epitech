import { Subject } from 'rxjs';
import { Rectangle } from '../models/Rectangle';

export default class Selector {

    coordStart: {x:number, y:number} = {x:0, y:0};
    coordEnd: {x:number, y:number} = {x:0, y:0};

    tzone: HTMLDivElement;
    selector: HTMLDivElement;

    listen = false;
    isSelecting = false;
    startDrawing = false;

    rectangle: Rectangle = {x:0, y:0, w:0, h:0};

    selection = new Subject<{x:number, y:number, w:number, h:number}>();

    constructor(){
        this.selector = document.createElement("div");
        this.selector.style.border = "1px solid black";
        this.selector.style.position = "absolute";
        this.selector.style.overflow = "hidden";
        
        this.tzone = document.createElement("div");
        this.tzone.appendChild(this.selector);
        this.tzone.id = "TZone";
        this.tzone.style.position = "absolute";
        this.tzone.style.left = "0px";
        this.tzone.style.top = "0px";
        this.tzone.style.width = "100%";
        this.tzone.style.height = "100%";
        
    }

    select(): Subject<{x:number, y:number, w:number, h:number}>{
        this.coordStart = {x:0, y:0};
        this.coordEnd = {x:0, y:0};
        this.drawSelector();

        this.isSelecting = true;
        document.body.appendChild(this.tzone);
       
        if(!this.listen){
            this.listen = true;
            window.addEventListener( "mousedown", (evt)=>this.isSelecting?this.selectionStart(evt):null, true)
            window.addEventListener( "mousemove", (evt)=>this.isSelecting?this.selectionChange(evt):null, true)
            window.addEventListener( "mouseup", (evt)=>this.isSelecting?this.selectionEnd(evt):null, true)
        }

        return this.selection;
    }

    async selectionEnd(evt: MouseEvent){
        this.coordEnd = {x: evt.clientX,y: evt.clientY};
        
        this.isSelecting = false;
        this.startDrawing = false;
        document.body.removeChild(this.tzone);

        //Wait a bit to make time for the selector to be removed from display
        await new Promise( (res)=>setTimeout(()=>res(null),10))
        
        this.selection.next(this.rectangle);
    }

    selectionStart(evt: MouseEvent){
        this.coordStart = {x: evt.clientX,y: evt.clientY};
        this.startDrawing = true;
    }

    selectionChange(evt: MouseEvent){
        this.coordEnd = {x: evt.clientX,y: evt.clientY};
        if(this.startDrawing) this.drawSelector();
    }

    drawSelector(){
        this.rectangle = {x:0, y:0, w:0, h:0};

        if(this.coordStart.x < this.coordEnd.x){
            this.rectangle.x = this.coordStart.x;
            this.rectangle.w = this.coordEnd.x - this.coordStart.x
        }else{
            this.rectangle.x = this.coordEnd.x
            this.rectangle.w = this.coordStart.x - this.coordEnd.x
        }

        if(this.coordStart.y < this.coordEnd.y){
            this.rectangle.y = this.coordStart.y;
            this.rectangle.h = this.coordEnd.y - this.coordStart.y
        }else{
            this.rectangle.y = this.coordEnd.y
            this.rectangle.h = this.coordStart.y - this.coordEnd.y
        }
        
        this.selector.style.left = this.rectangle.x+"px"
        this.selector.style.top = this.rectangle.y+"px"
        this.selector.style.width = this.rectangle.w+"px"
        this.selector.style.height = this.rectangle.h+"px"
    }
    
}