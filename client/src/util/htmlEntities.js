import { decode } from 'html-entities';

const HTML_ENTITIES = {

    //decode the html entity code to be shown in the browser 
    add: decode('&#43;'),
    star: decode('&#9733;'),
}

export default HTML_ENTITIES;

//plus
// &box&boxvh;
// &#x0253C;
// &#9532;

//left arrow
// &Lang;
// &#x027EA;
// &#10218;

//right arrow
// &Rang;
// &#x027EB;
// &#10219;