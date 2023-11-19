if(window.location.pathname === '/home.html'){
    var homeToggle = document.getElementById('home')
    homeToggle.classList.toggle('nav-active')
}

 else if(window.location.pathname === '/menu.html'){
    var menuToggle = document.getElementById('menu')
    menuToggle.classList.toggle('nav-active')
}
else if(window.location.pathname === '/orders.html'){
    var ordersToggle = document.getElementById('orders')
    ordersToggle.classList.toggle('nav-active')
}

else if(window.location.pathname === '/about.html'){
    var aboutToggle = document.getElementById('about')
    aboutToggle.classList.toggle('nav-active')
}