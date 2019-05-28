import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, transition, style,animate } from '@angular/animations';
import { ChangeDetectorRef } from '@angular/core';

interface Friend {
  id: number;
  name: string;
  favoriteMovie: string;
}

type Orientation = ( "prev" | "next" | "void" );
 let  recomm : any ;
@Component({
  selector: 'app-recomment',
  animations: [
    trigger(
        "friendAnimation",
        [
            transition(
                "void => prev", // ---> Entering --->
                [
             
                    style({
                        left: -100,
                        opacity: 0.0,
                        zIndex: 2
                    }),
                    animate(
                        "200ms ease-in-out",
                        style({
                            left: 0,
                            opacity: 1.0,
                            zIndex: 2
                            
                        })
                    )
                ]
            ),
            transition(
                "prev => void", // ---> Leaving --->
                [
                    animate(
                        "200ms ease-in-out",
                        style({
                            left: 100,
                            opacity: 0.0
                        })
                    )
                ]
            ),
            transition(
                "void => next", // <--- Entering <---
                [
                 
                    style({
                        left: 100,
                        opacity: 0.0,
                        zIndex: 2
                    }),
                    animate(
                        "200ms ease-in-out",
                        style({
                            left: 0,
                            opacity: 1.0,
                            zIndex: 2
                        })
                    )
                ]
            ),
            transition(
                "next => void", // <--- Leaving <---
                [
                    animate(
                        "200ms ease-in-out",
                        style({
                            left: -100,
                            opacity: 0.0
                        })
                    )
                ]
            )
        ]
    )
],
  templateUrl: './recomment.component.html',
  styleUrls: ['./recomment.component.css']
})
export class RecommentComponent  {
  public orientation: Orientation;
  public selectedFriend: Friend;

  private changeDetectorRef: ChangeDetectorRef;
  private friends: Friend[];
  private tempFriends: Friend[];
  private myArray: any[]= [];


  // I initialize the component.
  constructor( changeDetectorRef: ChangeDetectorRef ) {

      this.changeDetectorRef = changeDetectorRef;
      this.orientation = "void";

      // Setup the friends collection.
      this.friends = [
          {
              id: 1,
              name: "Sarah",
              favoriteMovie: "Happy Gilmore"
          },
          {
              id: 2,
              name: "Joanna",
              favoriteMovie: "Better Than Chocolate"
          },
          {
              id: 3,
              name: "Tricia",
              favoriteMovie: "Working Girl"
          },
          {
              id: 4,
              name: "Kim",
              favoriteMovie: "Terminator 2"
          },
          {
            id: 5,
            name: "Tricia5",
            favoriteMovie: "Working Girl"
        },
        {
            id: 6,
            name: "Kim6",
            favoriteMovie: "Terminator 2"
        }
      ];

      // Randomly(ish) select the initial friend to display.
     // this.selectedFriend = this.friends[ Math.floor( Math.random() * this.friends.length ) ];
     
      for(var i = 0; i < this.friends.length; i += 2) {
        this.myArray.push(this.friends.slice(i, i+2));
      }
      this.tempFriends = this.myArray[0];
      console.log(this.tempFriends);
  }


  // ---
  // PUBLIC METHODS.
  // ---


  // I cycle to the next friend in the collection.
  public showNextFriend() : void {

      // Change the "state" for our animation trigger.
      this.orientation = "next";

      // Force the Template to apply the new animation state before we actually
      // change the rendered element view-model. If we don't force a change-detection,
      // the new [@orientation] state won't be applied prior to the "leave" transition;
      // which means that we won't be leaving from the "expected" state.
      this.changeDetectorRef.detectChanges();

      // Find the currently selected index.
      var index = this.friends.indexOf( this.selectedFriend );

      // Move the rendered element to the next index - this will cause the current item
      // to enter the ( "next" => "void" ) transition and this new item to enter the
      // ( "void" => "next" ) transition.
      this.selectedFriend = this.friends[ index + 1 ]
          ? this.friends[ index + 1 ]
          : this.friends[ 0 ]
      ;
      console.log(index)
      if(index <0 ){index= 1};
      this.tempFriends = this.myArray[index];
      
      console.log(this.tempFriends)
  }


  // I cycle to the previous friend in the collection.
  public showPrevFriend() : void {

      // Change the "state" for our animation trigger.
      this.orientation = "prev";

      // Force the Template to apply the new animation state before we actually
      // change the rendered element view-model. If we don't force a change-detection,
      // the new [@orientation] state won't be applied prior to the "leave" transition;
      // which means that we won't be leaving from the "expected" state.
      this.changeDetectorRef.detectChanges();

      // Find the currently selected index.
      var index = this.friends.indexOf( this.selectedFriend );

      // Move the rendered element to the previous index - this will cause the current
      // item to enter the ( "prev" => "void" ) transition and this new item to enter
      // the ( "void" => "prev" ) transition.
      this.selectedFriend = this.friends[ index - 1 ]
          ? this.friends[ index - 1 ]
          : this.friends[ this.friends.length - 1 ]
      ;
      this.tempFriends = this.myArray[index - 1];
      console.log(this.tempFriends)
  }

}



