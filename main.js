/**
 * Created by Hong on 1/7/2017.
 */
window.onload = main;

function main() {

    //Mobile menu click
    linkMobileMenuClick1();
    linkMobileMenuClick2();

}

function linkMobileMenuClick2(){
    var menuboxes = document.getElementsByClassName("menubox");
    for (var i=0;i<menuboxes.length;i++){
        menuboxes[i].onclick = onMenuboxClick;
    }
    menuboxes[0].click();

    function onMenuboxClick(event){
        this.classList.toggle("selected_color",true);
        for (var i=0;i<menuboxes.length;i++){
            if (menuboxes[i] != this) menuboxes[i].classList.toggle("selected_color",false);
        }
        //Clean the content board and load the desired
        var div_contentboard = document.getElementById("content_board");
        div_contentboard.innerHTML = "";
        if (this.id.indexOf("graphic_design") != -1) addGraphicDesignPage(div_contentboard);
        else if (this.id.indexOf("animation") != -1) addAnimationPage(div_contentboard);
        else if (this.id.indexOf("forfun") != -1) addForfunPage(div_contentboard);
        else if (this.id.indexOf("contact") != -1) addContactPage(div_contentboard);
    }
}

function linkMobileMenuClick1(){
    var menuboxes = document.getElementsByClassName("menubox_wide");
    for (var i=0;i<menuboxes.length;i++){
        menuboxes[i].onclick = onMenuboxClick;
    }
    menuboxes[0].click();

    function onMenuboxClick(event){
        this.classList.toggle("selected_color",true);
        this.style.paddingLeft = "27px";
        this.style.paddingRight = "27px";
        for (var i=0;i<menuboxes.length;i++){
            if (menuboxes[i] != this){
                menuboxes[i].classList.toggle("selected_color",false);
                menuboxes[i].style.paddingLeft = null;
                menuboxes[i].style.paddingRight = null;
            }
        }
        //Clean the content board and load the desired
        var div_contentboard = document.getElementById("content_board");
        div_contentboard.innerHTML = "";
        if (this.id.indexOf("graphic_design") != -1) addGraphicDesignPage(div_contentboard);
        else if (this.id.indexOf("animation") != -1) addAnimationPage(div_contentboard);
        else if (this.id.indexOf("forfun") != -1) addForfunPage(div_contentboard);
        else if (this.id.indexOf("contact") != -1) addContactPage(div_contentboard);
    }
}

util_getOffset = function (el) {
    var _x = 0;
    var _y = 0;
    var _height = el.offsetHeight;
    var scrollelement = el;
    while (scrollelement) {
        if (scrollelement.scrollTop > 0) {
            _y -= scrollelement.scrollTop;
            break;
        } else
            scrollelement = scrollelement.parentElement;
    }
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft;
        _y += el.offsetTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x, bottom: _y+_height};
};

/*
 target_element : html which the menu expands under
 menu_datas : Array of datas
 menu_strings : Array of strings for display
 maxshow : (int) number of items to be shown in windows
 handler_function(Optional) : After Handler function when the menu is closed
 */
function util_createExpandingOverlayMenu(target_element, menu_datas, menu_strings, maxshow, handler_function) {

    var div_menu = document.createElement("DIV");
    div_menu.id = "menu_window";
    div_menu.setAttribute("style", "width:" + (target_element.offsetWidth - 2) + "px; position:relative; background:#fff; margin-top:-4px; overflow-y:scroll; z-index:10;");
    div_menu.style.height = target_element.offsetHeight * maxshow + "px";
    div_menu.style.color = "black";
    div_menu.style.border = "1px solid black";
    div_menu.TargetElement = target_element;
    div_menu.onclick = function (event) {
        event.stopPropagation();
    };

    for (var i = 0; i < menu_datas.length; i++) {
        var div_menuitem = document.createElement("DIV");
        div_menuitem.className = "overlaymenu_item";
        div_menuitem.style.height = (target_element.offsetHeight) + "px";
        div_menuitem.style.lineHeight = (target_element.offsetHeight) + "px";
        div_menuitem.innerText = menu_strings[i];
        div_menuitem.MenuData = menu_datas[i];
        div_menuitem.onclick = function (event) {
            div_menu.TargetElement.DataFromMenu = this.MenuData;
            div_menu.TargetElement.firstElementChild.innerText = this.innerText;
            div_menu.parentElement.removeChild(div_menu);
            if (handler_function) handler_function();
        };
        div_menu.appendChild(div_menuitem);
    }

    return div_menu;
}

/* =========================== Popup UIs ================================== */
/*
 fixed_length     : Int in pixels
 expanding_length : Int in pixels
 target           : target element where popup shows upon
 type             : Popup shape ("Conversation", "Rectangle")
 direction        : Popup expand direction ("Top", "Left")
 */
var arrow_size, arrow_margin = 30;
function util_createItemPopup (target_item) {

    var detail_obj = target_item.DetailJsonObj;

    //Creating Popup
    var div_overlay = document.createElement("DIV");
    div_overlay.id = "popup_overlay";
    div_overlay.className = "vp_overlay";
    div_overlay.onclick = function (event) {
        document.body.classList.toggle("noscroll",false);
        this.parentElement.removeChild(this);
    };

    var div_popup = document.createElement("DIV");
    div_popup.id = "popup";
    div_popup.setAttribute("style","width:100%; height:100%; position:relative; display:inline-block; background:rgb(30,30,30);" +
        "font-family: 'Open Sans', sans-serif;");
    div_popup.onclick = function (event) {
        event.stopPropagation();
        event.preventDefault();
    };

    /* ***CLOSE ICON include (X) / go to popup_closeicon in css*/
    var img_close = document.createElement("IMG");
    img_close.id = "popup_closeicon";
    img_close.className = "button";
    img_close.style.display = "none";
    img_close.src = "images/CloseIcon.svg";
    img_close.onclick = function(event){
        document.body.classList.toggle("noscroll",false);
        div_overlay.parentElement.removeChild(div_overlay);
    };
    div_popup.appendChild(img_close);

    /* ============ Row Setups ============ */
    var div_mainrow = document.createElement("DIV");
    div_mainrow.setAttribute("style","width:100%; height:85%; text-align:center; padding-top:3%;");
    div_popup.appendChild(div_mainrow);
    var div_bottomrow = document.createElement("DIV");
    div_bottomrow.setAttribute("style", "width:100%; height:10%; text-align:center; color:white; margin-top:1%; margin-bottom:2%; font-size: 0.8em;");
    div_bottomrow.id = "popup_description";
    div_bottomrow.innerText = detail_obj.title;
    div_popup.appendChild(div_bottomrow);

    var div_mainworkframe = document.createElement("DIV");
    div_mainworkframe.setAttribute("style", "height:100%; width:100%; display:inline-flex; justify-content:center; visibility:hidden;");
    div_mainrow.appendChild(div_mainworkframe);

    arrow_size = 50;//in pixels
    var arrow_color = "rgba(200,200,200,1)";

    var div_leftarrow = document.createElement("DIV");
    div_leftarrow.className = "button";
    div_leftarrow.AddIndex = -1;
    div_leftarrow.onclick = onArrowClick;
    div_leftarrow.setAttribute("style", "width:0; height:0;" +
        "border-top:" + arrow_size + "px solid transparent; border-bottom:" + arrow_size + "px solid transparent; border-right:" + arrow_size + "px solid " + arrow_color + ";" +
        " float:left; align-self:center; margin-right:"+arrow_margin+"px; visibility:hidden; opacity: 0.3;");
    div_mainworkframe.appendChild(div_leftarrow);

    var img_fakework = document.createElement("IMG");
    img_fakework.id = "popup_mainwork";
    div_mainworkframe.appendChild(img_fakework);
    var mainwork_index = 0;
    div_mainworkframe.replaceChild(createMainItem(detail_obj.works[mainwork_index].src, detail_obj.works[mainwork_index].type), img_fakework);

    var div_rightarrow = document.createElement("DIV");
    div_rightarrow.className = "button";
    div_rightarrow.AddIndex = 1;
    div_rightarrow.onclick = onArrowClick;
    div_rightarrow.setAttribute("style", "width:0; height:0; " +
        "border-top:" + arrow_size + "px solid transparent; border-bottom:" + arrow_size + "px solid transparent; border-left:" + arrow_size + "px solid " + arrow_color + ";" +
        " float:left; align-self:center; margin-left:"+arrow_margin+"px; opacity: 0.3;");
    if (detail_obj.works.length == 1) div_rightarrow.style.visibility = "hidden";
    div_mainworkframe.appendChild(div_rightarrow);

    div_overlay.appendChild(div_popup);
    return div_overlay;

    function onArrowClick(event) {
        mainwork_index += this.AddIndex;
        div_mainworkframe.replaceChild(createMainItem(detail_obj.works[mainwork_index].src, detail_obj.works[mainwork_index].type), document.getElementById("popup_mainwork"));
        if (mainwork_index == 0) {
            div_leftarrow.style.visibility = "hidden";
            if (detail_obj.works.length == 1) div_rightarrow.style.visibility = "hidden";
            else div_rightarrow.style.visibility = "";
        } else if (mainwork_index == detail_obj.works.length - 1) {
            div_rightarrow.style.visibility = "hidden";
            div_leftarrow.style.visibility = "";
        } else {
            div_leftarrow.style.visibility = "";
            div_rightarrow.style.visibility = "";
        }
    }

    function setImageByAspectRatio(img_element, imgsrc) {
        div_mainworkframe.style.visibility = "hidden";
        div_mainworkframe.classList.toggle("fadeIn", false);
        var img = new Image();
        img.onload = function () {
            img_element.src = imgsrc;
            img_element.RealWidth = img.width;
            img_element.RealHeight = img.height;
            handlePopupMainImage(img_element);
            handlePopupSizes();
            div_mainworkframe.classList.toggle("fadeIn", true);
            div_mainworkframe.style.visibility = "visible";
        };
        img.src = imgsrc;
    }

    function setVideoByScreenSize(video_element) {
        div_mainworkframe.style.visibility = "hidden";
        div_mainworkframe.classList.toggle("fadeIn", false);
        video_element.oncanplay = function () {
            handlePopupMainVideo(video_element);//Sets Video Size according to Screen Size
            handlePopupSizes();
            div_mainworkframe.classList.toggle("fadeIn", true);
            div_mainworkframe.style.visibility = "visible";
        }
        video_element.load();
    }

    function createMainItem(src, type){
        if (type == "image"){
            var img_mainwork = document.createElement("IMG");
            img_mainwork.id = "popup_mainwork";
            img_mainwork.setAttribute("style", "float:left; align-self:center; max-width:100%; max-height: 100%; height: auto; width: auto;");
            setImageByAspectRatio(img_mainwork, src);
            return img_mainwork;
        }else if (type == "video/mp4") {
            var video_mainwork = document.createElement("VIDEO");
            video_mainwork.id = "popup_mainwork";
            video_mainwork.className = "animation_itemvideo";
            video_mainwork.setAttribute("controls", "controls");
            video_mainwork.width = "640";
            var source_mainwork = document.createElement("SOURCE");
            source_mainwork.src = src;
            source_mainwork.type = type;
            video_mainwork.appendChild(source_mainwork);
            setVideoByScreenSize(video_mainwork);            
            return video_mainwork;
        }
    }

}

function handlePopupMainItem(element) {
    if (element.tagName == "IMG") {
        handlePopupMainImage(element);
    } else if (element.tagName == "VIDEO") {
        handlePopupMainVideo(element);
    }
}

function handlePopupMainImage(imgelement) {    
    var aspect_ratio = imgelement.RealHeight / imgelement.RealWidth; // height / width
    var width1 = document.getElementById("popup_overlay").offsetHeight*0.82 / imgelement.offsetHeight * imgelement.offsetWidth + arrow_size*2 + arrow_margin*4;
    var width2 = document.getElementById("popup_overlay").offsetWidth;
    console.log("Updating Popup : "+width1 +", "+width2);
    if (width1 < width2) {//Desktop View
        if (imgelement.ViewMode == "mobile" || typeof imgelement.ViewMode == "undefined") {
            console.log("changing to desktop view");
            imgelement.style.width = "";
            imgelement.style.height = String(100 * Math.min(aspect_ratio * 1.5, 1)) + "%";
            imgelement.ViewMode = "desktop";
            
        }        
    } else if (imgelement.ViewMode == "desktop" || typeof imgelement.ViewMode == "undefined") {//Mobile View
        console.log("changing to mobile view");
        imgelement.style.height = "";
        imgelement.style.width = "calc(100% - " + String(arrow_size * 2 + arrow_margin * 4) + "px)";
        imgelement.ViewMode = "mobile";
        
    }
}

function handlePopupMainVideo(video_element) {
    if (document.getElementById("popup_overlay").offsetWidth > 1200) {//Desktop
        video_element.width = 640;
    } else {//Mobile
        var buttonmargins = arrow_size * 2 + arrow_margin * 4;
        video_element.width = document.getElementById("popup_overlay").offsetWidth - buttonmargins;
    }
}

function handlePopupSizes() {
    if (document.getElementById("popup_overlay").offsetWidth > 1200) {//Desktop View
        document.getElementById("popup_description").style.fontSize = "0.8em";
        document.getElementById("popup_closeicon").style.display = "";
        document.getElementById("popup_closeicon").classList.toggle("popup_closeicon_mobile", false);
        document.getElementById("popup_closeicon").classList.toggle("popup_closeicon_desktop", true);
    } else {//Mobile View
        document.getElementById("popup_description").style.fontSize = "2.0em";
        document.getElementById("popup_closeicon").style.display = "";
        document.getElementById("popup_closeicon").classList.toggle("popup_closeicon_mobile", true);
        document.getElementById("popup_closeicon").classList.toggle("popup_closeicon_desktop", false);
    }    
    
}

function openInNewTab(url) {
    console.log("cliked");
    window.open(url);
}