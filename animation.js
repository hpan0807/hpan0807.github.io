/**
 * Created by Hong on 1/10/2017.
 */


var AnimationList2016 = [
    {
        title: "An Egg and a Witch",
        titlesrc: "animation/EggWitch/EggWitch.mp4",
        type: "video/mp4",
        description: "My first collaboration animation with Tan Nei Choi",
        works: [{ name: 'Poster', src: 'animation/EggWitch/EggWitch.png', type: 'image' }, { name: 'Poster', src: 'animation/EggWitch/EggWitch2.jpg', type: 'image' }]
    },
    {
        title: "Don't Pull!",
        titlesrc: "animation/donple/DontPull.mp4",
        type: "video/mp4",
        description: "",
        works: [{ name: 'Poster', src: 'animation/donple/DontPull1.png', type: 'image' }, { name: 'Poster', src: 'animation/donple/DontPull2.png', type: 'image' }, { name: 'Poster', src: 'animation/donple/DontPull3.png', type: 'image' }, { name: 'Poster', src: 'animation/donple/DontPull4.png', type: 'image' }]
    },
    {
        title: "Butterfly Lands on a Girl",
        titlesrc: "animation/PhotographyAnimation.mp4",
        type: "video/mp4",
        description: "My first animation using photography",
        works: [{ name: 'Poster', src: 'animation/PhotographyAnimation2.jpg', type: 'image' }, { name: 'Poster', src: 'animation/PhotographyAnimation3.jpg', type: 'image' }, { name: 'Poster', src: 'animation/PhotographyAnimation4.jpg', type: 'image' }, { name: 'Poster', src: 'animation/PhotographyAnimation5.jpg', type: 'image' }, { name: 'Poster', src: 'animation/PhotographyAnimation1.mp4', type: 'video/mp4' }]
    }
];

var AnimationList2015 = [
     {
         title: "The Law of the Jungle",
         titlesrc: "animation/practices/TheLawoftheJungle.mp4",
         type: "video/mp4",
         description: ""
     },
     {
         title: "Jumpling Flour Sack Study",
         titlesrc: "animation/practices/JumpingFlourSack.mp4",
         type: "video/mp4",
         description: ""
     },
     {
         title: "Bouncing Ball Study",
         titlesrc: "animation/practices/BouncingBall.mp4",
         type: "video/mp4",
         description: ""
     }
];

function addAnimationPage(div_parent) {

    window.onresize = animation_onWindowResize;

    var div_cushion = document.createElement("DIV");
    div_cushion.setAttribute("style", "display:block; width:100%; height:30px;");
    div_parent.appendChild(div_cushion);

    //Add Items
    addItemsForYear(2016, AnimationList2016);
    addItemsForYear(2015, AnimationList2015);

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
                videos[i].width = String(div_parent.offsetWidth * 0.9);
            }
        }

        if (document.getElementById("popup_overlay")) {//If there is a popup, update mainwork image resizing
            handlePopupMainItem(document.getElementById("popup_mainwork"));
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
            video_item.setAttribute("controls", true);
            video_item.width = "640";
            var source_item = document.createElement("SOURCE");
            source_item.src = item.titlesrc;
            source_item.type = item.type;
            video_item.appendChild(source_item);
            div_itemwrapper.appendChild(video_item);
            video_item.load();
            //Description
            var div_description = document.createElement("DIV");
            div_description.className = "animation_itemdescription";
            div_description.innerText = item.description;
            div_itemwrapper.appendChild(div_description);
            //Process Work Button
            if (item.works) {
                var div_processworkbutton = document.createElement("DIV");
                div_processworkbutton.className = "processwork_button button";
                div_processworkbutton.innerText = "View Process Work";
                div_processworkbutton.DetailJsonObj = item;
                div_processworkbutton.onclick = function (event) {
                    document.body.classList.toggle("noscroll", true);
                    document.body.appendChild(util_createItemPopup(this));
                }
                div_itemwrapper.appendChild(div_processworkbutton);
            }                        

            div_parent.appendChild(div_itemwrapper);
        }

        var div_line = document.createElement("DIV");
        div_line.setAttribute("style", "height:3px; width: 60%; background-color: rgb(10, 46, 50); margin-bottom: 60px; margin-left: auto; margin-right: auto; opacity: 0.1;");
        div_parent.appendChild(div_line);
    }

}
