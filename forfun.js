/**
 * Created by Hong on 1/10/2017.
 */

var ForfunList = [

    {
        title: "Fun doodle",
        titlesrc: "sketches/title1.png",
        type:"pos",
        works: [{ name: 'Poster', src: 'sketches/1.jpg', type: 'image' }]
    },
    {
        title: "Fun doodle",
        titlesrc: "sketches/title2.jpg",
        type: "pos",
        works: [{ name: 'Poster', src: 'sketches/2.jpg', type: 'image' }]
    },
    {
        title: "Fun doodle",
        titlesrc: "sketches/title3.jpg",
        type: "pos",
        works: [{ name: 'Poster', src: 'sketches/3.jpg', type: 'image' }]
    },
    {
        title: "Fun doodle",
        titlesrc: "sketches/title4.jpg",
        type: "pos",
        works: [{ name: 'Poster', src: 'sketches/4.jpg', type: 'image' }]
    },
    {
        title: "Fun doodle",
        titlesrc: "sketches/title5.jpg",
        type: "pos",
        works: [{ name: 'Poster', src: 'sketches/5.jpg', type: 'image' }]
    },
    {
        title: "Fun doodle",
        titlesrc: "sketches/title6.jpg",
        type: "pos",
        works: [{ name: 'Poster', src: 'sketches/6.jpg', type: 'image' }]
    },
    {
        title: "Fun doodle",
        titlesrc: "sketches/title7.jpg",
        type: "pos",
        works: [{ name: 'Poster', src: 'sketches/7.jpg', type: 'image' }]
    },
    {
        title: "Fun doodle",
        titlesrc: "sketches/title8.jpg",
        type: "pos",
        works: [{ name: 'Poster', src: 'sketches/8.jpg', type: 'image' }]
    },
    {
        title: "Fun doodle",
        titlesrc: "sketches/title9.jpg",
        type: "pos",
        works: [{ name: 'Poster', src: 'sketches/9.jpg', type: 'image' }]
    },
    {
        title: "Fun doodle",
        titlesrc: "sketches/title10.jpg",
        type: "pos",
        works: [{ name: 'Poster', src: 'sketches/10.jpg', type: 'image' }]
    },
    {
        title: "Fun doodle",
        titlesrc: "sketches/title11.jpg",
        type: "pos",
        works: [{ name: 'Poster', src: 'sketches/11.jpg', type: 'image' }]
    },
    {
        title: "Fun doodle",
        titlesrc: "sketches/title12.jpg",
        type: "pos",
        works: [{ name: 'Poster', src: 'sketches/12.jpg', type: 'image' }]
    },
    {
        title: "Fun doodle",
        titlesrc: "sketches/title13.jpg",
        type: "pos",
        works: [{ name: 'Poster', src: 'sketches/13.jpg', type: 'image' }]
    },
    {
        title: "Fun doodle",
        titlesrc: "sketches/title14.jpg",
        type: "pos",
        works: [{ name: 'Poster', src: 'sketches/14.jpg', type: 'image' }]
    },
    {
        title: "Fun doodle",
        titlesrc: "sketches/title15.jpg",
        type: "pos",
        works: [{ name: 'Poster', src: 'sketches/15.jpg', type: 'image' }]
    },
    {
        title: "Fun doodle",
        titlesrc: "sketches/title16.jpg",
        type: "pos",
        works: [{ name: 'Poster', src: 'sketches/16.jpg', type: 'image' }]
    }
 
  

];

function addForfunPage(div_parent) {

    var div_top = document.createElement("DIV");
    div_top.className = "TopDiv";
    div_parent.appendChild(div_top);

    var div_sort = document.createElement("DIV");
    div_sort.className = "SortBy";
    div_top.appendChild(div_sort);

    var div_sortmenu = document.createElement("DIV");
    div_sortmenu.className = "SortMenuDiv";
    div_sort.appendChild(div_sortmenu);

    var div_sortmenuoptionbox = document.createElement("DIV");
    div_sortmenuoptionbox.id = "graphic_menu";
    div_sortmenuoptionbox.DataFromMenu = "all";
    div_sortmenu.appendChild(div_sortmenuoptionbox);



    /* ================= Adding Items ====================== */
    var ItemDivArray = [];
    window.onresize = graphic_onWindowResize;

    var graphic_list16 = ["1.png"];



    addItemsForYear(2016, "sketches", ForfunList);

    graphic_onWindowResize();// Update Items View



    /* ============================= Internal Functions =============================== */
    function graphic_onWindowResize(event){
        if(document.body.offsetWidth > 1200){
            var item_space = 310;
            for (var i=0; i < ItemDivArray.length ; i++){
                var div_items = ItemDivArray[i];
                var ItemsPerRow = Math.max(Math.floor(div_items.offsetWidth / item_space), 1);
                console.log(ItemsPerRow);
                div_items.style.marginLeft = Math.max(((document.body.offsetWidth - ItemsPerRow*item_space)/2), 0)+"px";
                if (ItemsPerRow != div_items.ItemsPerRow){
                    addGraphicItems(div_items, ItemsPerRow, "250px", "height:250px;");
                    div_items.ItemsPerRow = ItemsPerRow;
                }
            }
        }else{
            for (var i=0; i < ItemDivArray.length ; i++){
                var div_items = ItemDivArray[i];
                var ItemsPerRow = 1;

                console.log(ItemsPerRow);
                let itemsize = document.body.offsetWidth*0.7;
                div_items.style.marginLeft = Math.max(((document.body.offsetWidth - itemsize-60)/2), 0)+"px";
                addGraphicItems(div_items, ItemsPerRow,itemsize+ "px","height:"+itemsize+"px;");
                div_items.ItemsPerRow = ItemsPerRow;

            }
        }


        if (document.getElementById("popup_overlay")) {//If there is a popup, update mainwork image resizing
            handlePopupMainImage(document.getElementById("popup_mainwork"));
        }
    }



    function addGraphicItems(div_items, i_perrow, itemwidth, parentheight) {
        div_items.innerHTML = "";
        var menubox = document.getElementById("graphic_menu");
        var targetstr = menubox.DataFromMenu;
        var graphiclist_clone = div_items.Items.slice(0);
        while (graphiclist_clone.length > 0) {
            var div_wrapper = document.createElement("DIV");
            div_wrapper.setAttribute("style", "display:block; width:100%; "+parentheight+" margin-top:60px; margin-bottom:60px;");
            for (var i = 0; (i < i_perrow) && graphiclist_clone.length>0; i++) {
                var gl_json = graphiclist_clone.shift();
                var gl_dir = gl_json.titlesrc;
                if (!gl_dir) break;

                if (targetstr == "oth"){
                    if (gl_dir.indexOf("pos")!=-1 || gl_dir.indexOf("log")!=-1){
                        i--;
                        continue;
                    }
                }else if (targetstr == "pos" || targetstr == "log"){
                    if (gl_dir.indexOf(targetstr)==-1){
                        i--;
                        continue;
                    }
                }

                var div_works = document.createElement("DIV");
                div_works.setAttribute("style", "float:left; margin-left:30px; margin-right:30px;" +
                    "width: "+itemwidth+"; height: "+itemwidth+"; background-size:"+itemwidth+"; background-repeat: no-repeat;");
                div_works.style.backgroundImage = "url(" + gl_dir + ")";
                div_works.className = "gi_"+gl_dir.type+" graphic_item button";
                div_works.DetailJsonObj = gl_json;
                div_works.onclick = function (event){
                    document.body.classList.toggle("noscroll",true);
                    document.body.appendChild(util_createItemPopup(this));
                };
                div_wrapper.appendChild(div_works);
            }
            if (div_wrapper.children.length > 0) div_items.appendChild(div_wrapper);
        }
    }

    function addItemsForYear(year, folder, items){
        var div_year = document.createElement("DIV");
        div_parent.appendChild(div_year);

        var div_subparent1 = document.createElement("DIV");
        div_subparent1.setAttribute("style", "display:block;");
        div_subparent1.Items = items;
        div_parent.appendChild(div_subparent1);
        ItemDivArray.push(div_subparent1);

        var div_line = document.createElement("DIV");
        div_line.setAttribute("style","height:3px; width: 60%; background-color: rgb(10, 46, 50); margin-bottom: 60px; margin-left: auto; margin-right: auto; opacity: 0.1;");
        div_parent.appendChild(div_line);
    }

    function onGraphicDesignMenuClick(){
        for (var i=0; i < ItemDivArray.length ; i++){
            var div_items = ItemDivArray[i];
            div_items.ItemsPerRow = null;
        }
        graphic_onWindowResize();
    }



    /*{
     title: "InternationalM",
     description: {
     text: "blahblah",
     src: 'images/logo/descr.png'//logo below text
     },
     processwork: ['images/logo/proces1.png', 'images/logo/proces2.png'],
     works: [{ name: 'poster', src: 'images/logo/descr.png', type: 'video' }, { name: 'facebook profile', src: 'images/logo/descr.png', type: 'image' }, { name: 'facebook profile', src: 'images/logo/descr.png', type: 'link' }]
     }//type: image, video, link */
}



