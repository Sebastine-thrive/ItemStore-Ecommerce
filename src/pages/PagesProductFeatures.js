import React, { Component } from "react";
import  "./PagesProductFeatures.css";




export class PageSizebox extends Component {

    render() {
        return (

            <div className="pagecart-size">
                <h4> <strong>  Size: </strong> </h4>
                <div className="page-box">
                    <ul>
                        <li>
                            <input className="size-box" type="radio" id="XS" name="size" value="xs" />
                            <label htmlFor="XS"> XS</label>
                        </li>

                        <li>
                            <input className="size-box" type="radio" id="S" name="size" value="s" />
                            <label htmlFor="S"> S</label>
                        </li>

                        <li>
                            <input className="size-box" type="radio" id="M" name="size" value="m" />
                            <label htmlFor="M" > M</label>
                        </li>

                        <li>
                            <input className="size-box" type="radio" id="L" name="size" value="l" />
                            <label htmlFor="L"> L</label>
                        </li>
                    </ul>

                </div>
            </div>
        )
    }
}


// export class PageColourbox extends Component {

//     render() {
//         return (

//             <div className="pagecart-color">
//                 <h4><strong> Color: </strong> </h4>

//                 <div className="page-box2">
//                     <ul>
//                         <li>
//                             <input className="color-box-red" type="radio" id="red" name="color" value="red" />
//                             <label htmlFor="red" />
//                         </li>

//                         <li>
//                             <input className=" color-box-green" type="radio" id="green" name="color" value="green" />
//                             <label htmlFor="green" />
//                         </li>

//                         <li>
//                             <input className=" color-box-blue" type="radio" id="blue" name="color" value="blue" />
//                             <label htmlFor="blue" />
//                         </li>

//                         <li>
//                             <input className=" color-box-white" type="radio" id="white" name="color" value="white" />
//                             <label htmlFor="white" />
//                         </li>
//                     </ul>

//                 </div>
//             </div>
//         )
//     }
// }