/**
 * Created by Hong on 1/10/2017.
 */

function addContactPage(div_parent) {

    var iframe_contact = document.createElement("IFRAME");
    iframe_contact.src = "contact/index.html";
    iframe_contact.setAttribute("style", "width:100%; height:1000px;");
    div_parent.appendChild(iframe_contact);
}

    
