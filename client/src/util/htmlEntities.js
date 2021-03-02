import { decode } from 'html-entities';

const HTML_ENTITIES = {

    //decode the html entity code to be shown in the browser 
    add: decode('&#43;'),
    star: decode('&#9733;'),
    leftArrow: decode('&#8656;'),
    rightArrow: decode('&#8658;'),
}

export default HTML_ENTITIES;