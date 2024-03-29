export class Router {
  routes = {};

  add(routeName, page, backgroundImage) {
    this.routes[routeName] = { page, backgroundImage };
  }

  changeBackgroundImage(backgroundImage) {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = 'cover'; // Cobrir toda a página
    document.body.style.backgroundPosition = 'top center'; // Centralizar imagem de fundo
    document.body.style.backgroundRepeat = 'no-repeat'; // Evitar repetição da imagem
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, '', event.target.href);

    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes[404];

    // Mudar a imagem de fundo
    this.changeBackgroundImage(route.backgroundImage);

    fetch(route.page).then(data =>
      data
        .text()
        .then(html => (document.querySelector('#app').innerHTML = html))
    );
  }
}
