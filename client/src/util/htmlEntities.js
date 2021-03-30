import { decode } from 'html-entities';

const HTML_ENTITIES = {

    //decode the html entity code to be shown in the browser 
    add: decode('&#43;'),
    remove: decode('&#88;'),
    star: decode('&#9733;'),
    borderStar: decode('&#9734;'),
    leftArrow: decode('&#8656;'),
    rightArrow: decode('&#8658;'),
    search: decode('&#x1f50d;'),
}

export default HTML_ENTITIES;