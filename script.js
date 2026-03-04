const cartCount = document.querySelector ( '#cartCount' ) ;
const favoritesCount = document.querySelector ( '#favoritesCount' ) ;
const bagButtons = document.querySelectorAll ( ' . bag-btn' ) ;
const buyButtons = document.querySelectorAll ( ' . buy - btn' );
const favButtons = document.querySelectorAll ( ' . fav - btn' );
const subscribeForm = document.querySelector ( ' . subscribe-form' );

const cartBtn = document.querySelector ( '#cartBtn ' ) ;
const favoritesBtn = document.querySelector ( '#favoritesBtn ' ) ;
const cartDrawer = document.querySelector ( '#cartDrawer ' ) ;
const favoritesDrawer = document.querySelector ( '#favoritesDrawer ' ) ;
const closeCartBtn = document.querySelector ( '#closeCartBtn ' ) ;
const closeFavoritesBtn = document.querySelector ( ' #closeFavoritesBtn' ) ;

const cartItemsList = document.querySelector ( ' # cartItems' );
const favoriteItemsList = documento . querySelector ( '#favoriteItems' );
const cartTotal = document.querySelector ( ' # cartTotal' );
const checkoutBtn = document.querySelector ( '#checkoutBtn ' ) ;

const loginBtn = document.querySelector ( '#loginBtn ' ) ;
const registerBtn = document.querySelector ( '#registerBtn ' ) ;
const authModal = document.querySelector ( '#authModal' ) ;
const authTitle = document.querySelector ( '#authTitle' ) ;
const authSubmit = document.querySelector ( '#authSubmit' ) ;
const authForm = document.querySelector ( '#authForm' ) ;
const closeAuthBtn = document.querySelector ( '#closeAuthBtn' ) ;

const toast = document.querySelector ( ' #toast' )
 ;

const estado = {
  carrinho : JSON.parse ( localStorage.getItem ( 'avyra_cart' ) || ' [] ' ) ,
  favoritos : JSON.parse ( localStorage.getItem ( 'avyra_favorites' ) || ' [ ] ' )
  carrinho : JSON.parse ( localStorage.getItem ( 'avyra_cart' ) || ' [ ] ' )
};

const money = ( value ) => `R$ ${value.toFixed( 2 ).replace( '.' , ',' )} ` ;
 

função notificar ( mensagem ) {
 
  toast.textConteúdo = mensagem;
  toast.classList.add ( ' show ' )
 ;
  setTimeout ( () => toast. classList . remove ( 'show' ), 1800 );
}

função persistir ( ) {
 
  localStorage.setItem ( ' avyra_cart ' , JSON.stringify ( state.cart ) ) ;
  localStorage.setItem ( ' avyra_favorites ' , JSON.stringify ( state.favorites ) ) ;
}

função renderCarrinho ( ) {
 
  cartCount.textConteúdo = estado.carrinho.comprimento ;​​​
  cartItemsList.innerHTML = ' ' ;

  se ( !
 estado.carrinho.comprimento ) {
    cartItemsList.innerHTML = '<li>Sua sacola está vazia.</li>';
    carrinhoTotal. textContent = 'Total: R$ 0,00' ;
    retornar ;
  }

  seja total = 0 ;
  estado. carrinho.forEach ( ( item , índice ) = > {
    total += preço do item ;
    const li = document.createElement ( 'li ' ) ;
    li.innerHTML = `
      <span> ${item.name} — ${money(item.price)} </span>
      <button class="ghost-btn remove-btn" data-remove-index=" ${index} ">Remover</button>
    ` ;
    cartItemsList.appendChild (li)
 ;
  });

  carrinhoTotal. textContent = `Total: ${dinheiro(total)} ` ;
}

função renderFavoritos ( ) {
 
  favoritesCount.textContent = state.favorites.length ;​​​
  favoriteItemsList.innerHTML = ' ' ;

  se ( !
 estado.favoritos.comprimento ) {
    favoriteItemsList.innerHTML = '<li>Nenhum perfume favoritado ainda.</li>';
  } outro {
    estado. favoritos.forEach ( ( nome ) = > {
      const li = document.createElement ( 'li ' ) ;
      li.innerHTML = `<span> ${name} </span> `
 ;
      favoriteItemsList.appendChild ( li);
    });
  }

  favButtons.forEach ( ( button ) = > {
    const card = button.closest ( ' . product-card' );
    const nome = cartão?. conjunto de dados . nome ;
    botão.classList.toggle ( 'ativo '
 , state.favorites.includes ( name ) ) ;
  });
}

função adicionarAoCarrinho ( nome, preço ) {
 
  estado. carrinho . empurrar ({ nome, preço : Número (preço) });
  persistir ();
  renderCarrinho ();
  notify(`${name} adicionado à sacola!`);
}

bagButtons.forEach ( ( button ) = > {
  botão.addEventListener ( 'click' , ( event ) = > {
    const card = event.target.closest ( ' . product-card' )
 ;
    adicionarAoCarrinho (cartão?. conjuntoDeDados . nome ?? 'Produto' , cartão?. conjuntoDeDados . preço ?? 0 );
  });
});

buyButtons.forEach ( ( button ) = > {
  botão.addEventListener ( 'click' , ( event ) = > {
    const card = event.target.closest ( ' . product-card' )
 ;
    const name = card?. dataset . name ?? 'Produto' ;
    const preço = cartão?. conjunto de dados . preço ?? 0 ;
    adicionarAoCarrinho (nome, preço);
    cartDrawer.classList.add ( ' aberto ' )
 ;
    notify(`Compra rápida iniciada para ${name}.`);
  });
});

favButtons.forEach ( ( button ) = > {
  botão.addEventListener ( 'click' , ( event ) = > {
    const card = event.target.closest ( ' . product-card' )
 ;
    const nome = cartão?. conjunto de dados . nome ;
    se (!nome) retornar ;

    const index = state. favorites . indexOf (name);
    se (índice >= 0 ) {
      estado. favoritos . emendar (índice, 1 );
      notify(`${name} removido dos favoritos.`);
    } outro {
      estado. favoritos . push (nome);
      notify(`${name} adicionado aos favoritos.`);
    }

    persistir ();
    renderFavoritos ();
  });
});

cartItemsList.addEventListener ( 'click' , ( event ) = > {
  const target =
 event.target ;
  Se (!(target instanceof HTMLElement )) retorne ;
 

  const index
 = target.dataset.removeIndex ;​
  se (índice === indefinido ) retorne ;

  estado. carrinho . emendar ( Número (índice), 1 );
  persistir ();
  renderCarrinho ();
});

checkoutBtn.addEventListener ( 'click' , () = > {
  se ( !
 estado.carrinho.comprimento ) {
    notify('Sua sacola está vazia.');
    retornar ;
  }

  estado.carrinho = [];
  persistir ();
  renderCarrinho ();
  notify('Pedido finalizado com sucesso!');
});

cartBtn.addEventListener ( 'click' , ( ) => cartDrawer.classList.toggle ( ' open ' ) );
favoritesBtn.addEventListener ( ' click ' , () => favoritesDrawer.classList.toggle ( ' open ' ) );
closeCartBtn.addEventListener ( ' click' , () => cartDrawer.classList.remove ( ' open ' ) );
closeFavoritesBtn.addEventListener ( ' click' , () => favoritesDrawer.classList.remove ( ' open ' ) ) ;
favoritesBtn.addEventListener('click', () =>notify('Lista de favoritos em breve 💛'));
 

função abrirAuth ( tipo ) {
 
  authModal.classList.add ( ' open ' )
 ;
  authModal.setAttribute ( 'aria-hidden' , 'false' )
 ;
  authTitle.textContent = type === 'register' ? 'Criar conta' : 'Entrar';
  authSubmit.textContent = type === 'register' ? 'Cadastrar' : 'Entrar';
  authForm.dataset.mode = type ;
​
}

loginBtn.addEventListener ( 'click' , () => openAuth ( ' login' ));
 
registerBtn.addEventListener ( 'click' , () => openAuth ( 'register' ))
 ; 
closeAuthBtn.addEventListener ( 'click' , () = > {
  authModal.classList.remove ( ' open ' )
 ;
  authModal.setAttribute ( 'aria-hidden' , 'true' )
 ;
});

authForm.addEventListener ( 'submit' , ( event ) = > {
  evento.prevenirPadrão ()
 ;
  const mode = authForm.dataset.mode === 'register' ? 'Cadastro' : 'Login';
  notify(`${mode} realizado com sucesso!`);
  authModal.classList.remove ( ' open ' )
 ;
  authModal.setAttribute ( 'aria-hidden' , 'true' )
 ;
  authForm.reset ( );
});

subscribeForm? .addEventListener ( 'submit' , ( event ) => {
  evento.prevenirPadrão ()
 ;
  notify('Cadastro realizado! Em breve você receberá novidades AVYRA.');
  subscribeForm.reset ( );
});

renderCarrinho ();
renderFavoritos ();
