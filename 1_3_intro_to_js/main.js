/* selfnote: doesn't work on my computer, need to figure out why
// constructors are used for object orienting, sets the default for objects with default or user defined values
class customSelect{
    constructor(originalSelect){
        this.originalSelect = originalSelect; //creates traits and puts them in a list
        this.customSelect = document.createElement('div');
        this.customSelect.classList.add('select');

        //this creates recreates the div html for the buttons
        this.originalSelect.querySelectorAll('option').forEach((optionElement) => { //creates traits in option putting in it div form with strings 
            const itemElement = document.createElement('div');
        
             itemElement.classList.add('select_item');
             itemElement.textContent = optionElement.textContent;
            this.customSelect.appendChild(itemElement);

            itemElement.addEventListener('click',()=>{
                if(itemElement.classList.contains('select_item_selected')){ //checks if item is currently selected
                    this._deselect(itemElement);
                }
                    else{
                    this.select(itemElement);
                }    
            });

        });

        this.originalselect.insertAdjacent('afterend',this.customSelect);
    }
    _select(itemElement){//allows me to select in the div button
        const index = Array.from(this.customSelect.children).indexOf(itemElement); //creates array for all select divs

        this.originalSelect.querySelectorAll('option')[index].selected = true;//grabs all the options and the index of selected
        itemElement.classList.add('select_item_selected');
    }
    deselect(itemElement){//allows me to deselect in the div button

    }
}
//referencing custom_select
document.querySelectorAll('.custom_select').forEach((selectElement) =>{
    new customSelect(selectElement);
});

*/
//functions to allow buttons to work by pointing at them
let add = document.getElementById('increase');//declaring increaes
let remove = document.getElementById('decrease');//declaring decrease

let int = document.getElementById('number');//declaring number
let count = 0;//counter set at 0

//what the add button does inside the function
add.addEventListener('click',function(){
    //counter increases to 1
    count ++;
    int.innerHTML = count;//this changes number to count
})

//what the remove button does out
remove.addEventListener('click',function(){
    count --;
    int.innerHTML = count;//this changes number to count
})
