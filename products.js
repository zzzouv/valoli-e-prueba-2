//No tenemos jQUERY en el carrito solo usamos manipulaciones del DOM, manejo de eventos y logica.

//aqui llamamos al css de la imagen del carrito
const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');


const productsList = document.querySelector('.container-items');


let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

//evento para agregar cosas al carrito
productsList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        //aqui obtenemos los detalles del producto seleccionado
        const product = e.target.parentElement;

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        };

        //aqui verifica si el producto ya existe en el carrito
        const exits = allProducts.some(
            product => product.title === infoProduct.title
        );
        //aqui si existe actualiza la cantidad del producto o lo agrega al carrito
        if (exits) {
            const products = allProducts.map(product => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }
            });
            allProducts = [...products];
        } else {
            allProducts = [...allProducts, infoProduct];
        }

        //aqui se muestran los cambios en la intefaz de la pagina
        showHTML();
    }
});
//aqui con un evento click para eliminar las cosas que contiene el carrito
rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        //aqui filtra el producto que se va a eliminar del array
        allProducts = allProducts.filter(
            product => product.title !== title
        );

        console.log(allProducts);
        
        //aqui muestra los cambios en la pagina
        showHTML();
    }
});

//aqui creamos la funcion para mostrar las cosas del carrito
const showHTML = () => {
    //aqui muestra el mensaje de "carrito vacio" si no hay ningun producto
    if (!allProducts.length) {
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        //aqui muestra los productos en el carrito
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }

    //aqui se limpia los productos que contiene el carrito
    rowProduct.innerHTML = '';

    //estas son las variables para poder calcular el total de la compra y el numero total de productos que contiene el carrito
    let total = 0;
    let totalOfProducts = 0;

    //aqui recorre todos los productos dentro del carrito
    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;
        
        //aqui agrega los productos al carrito en la pagina
        rowProduct.append(containerProduct);

        //aqui calcula el total de la compra en clp y el numero total de los productos 
        const price = parseFloat(product.price.replace('$', '').replace('.', '').replace(',', '.'));
        total += price * product.quantity;

        totalOfProducts += product.quantity;
    });
    //aqui formatea y muestra el total de la compra y el numero total de productos que hay dentro del carrito ya todo arreglado
    const formattedTotal = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(total);
    valorTotal.innerText = formattedTotal;
    countProducts.innerText = totalOfProducts;
};

