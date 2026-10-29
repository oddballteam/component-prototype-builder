/* "How this tool works": the footer accordion and the header button that jumps to it. */
(function(){
  var btn=document.getElementById("how-btn"),panel=document.getElementById("how-panel"),
      jump=document.getElementById("how-jump"),sec=document.getElementById("how-it-works");
  if(!btn||!panel||!jump||!sec)return;
  function set(open){btn.setAttribute("aria-expanded",String(open));panel.hidden=!open}
  btn.addEventListener("click",function(){set(btn.getAttribute("aria-expanded")!=="true")});
  jump.addEventListener("click",function(e){
    e.preventDefault();
    set(true);
    var calm=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sec.scrollIntoView({behavior:calm?"auto":"smooth",block:"start"});
    btn.focus({preventScroll:true});
  });
  /* Opening the page at #how-it-works shows the steps. */
  if(location.hash==="#how-it-works")set(true);
})();
