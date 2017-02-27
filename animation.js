/**
 * Created by Hong on 1/10/2017.
 */

var AnimationList2016 = [
    {
        title: "Butterfly",
        titlesrc: "animation/IMG_2032.mp4",
        type: "video/mp4",
        description: "blahblahblah",
        works: [{ name: 'Poster', src: 'sketches/1.jpg', type: 'image' }]
    }
];

function addAnimationPage(div_parent){

    window.onresize = animation_onWindowResize;    

    var div_cushion = document.createElement("DIV");
    div_cushion.setAttribute("style", "display:block; width:100%; height:30px;");
    div_parent.appendChild(div_cushion);

    //Add Items
    addItemsForYear(2016, AnimationList2016);

    //Adjust to environment
    animation_onWindowResize();

    function animation_onWindowResize(event) {
        var item_wrappers = document.getElementsByClassName("animation_itemwrapper");
        var videos = document.getElementsByClassName("animation_itemvideo");
        if (document.body.offsetWidth > 1200) {//Desktop View
            for (let i = 0; i < item_wrappers.length; i++) {
                item_wrappers[i].classList.toggle("mobile", false);
                videos[i].width = "640";
            }
        } else {//Mobile View            
            for (let i = 0; i < item_wrappers.length; i++) {
                item_wrappers[i].classList.toggle("mobile", true);
                videos[i].width = String(div_parent.offsetWidth*0.9);
            }
        }

        if (document.getElementById("popup_overlay")) {//If there is a popup, update mainwork image resizing
            handlePopupMainImage(document.getElementById("popup_mainwork"));
            handlePopupSizes();
        }
    }

    function addItemsForYear(year, items) {
        var div_year = document.createElement("DIV");
        div_year.className = "Year";
        div_year.innerText = String(year);
        div_parent.appendChild(div_year);
        

        for (var i = 0; i < items.length; i++) {
            let item = items[i];

            var div_itemwrapper = document.createElement("DIV");
            div_itemwrapper.className = "animation_itemwrapper";

            //Title
            var div_title = document.createElement("DIV");
            div_title.className = "animation_itemtitle";
            div_title.innerText = item.title;
            div_itemwrapper.appendChild(div_title);
            //Video
            var video_item = document.createElement("VIDEO");
            video_item.className = "animation_itemvideo";
            video_item.setAttribute("controls", "controls");
            video_item.width = "640";
            var source_item = document.createElement("SOURCE");
            source_item.src = item.titlesrc;
            source_item.type = item.type;
            video_item.appendChild(source_item);
            div_itemwrapper.appendChild(video_item);
            //Description
            var div_description = document.createElement("DIV");
            div_description.className = "animation_itemdescription";
            div_description.innerText = item.description;
            div_itemwrapper.appendChild(div_description);
            //Process Work Button
            var div_processworkbutton = document.createElement("DIV");
            div_processworkbutton.className = "processwork_button button";
            div_processworkbutton.innerText = "Process Work Button";
            div_processworkbutton.DetailJsonObj = item;
            div_processworkbutton.onclick = function (event) {
                document.body.classList.toggle("noscroll", true);
                document.body.appendChild(util_createItemPopup(this));
            }
            div_itemwrapper.appendChild(div_processworkbutton);

            div_parent.appendChild(div_itemwrapper);
        }

        var div_line = document.createElement("DIV");
        div_line.setAttribute("style", "height:3px; width: 60%; background-color: rgb(10, 46, 50); margin-bottom: 60px; margin-left: auto; margin-right: auto; opacity: 0.1;");
        div_parent.appendChild(div_line);
    }

}
