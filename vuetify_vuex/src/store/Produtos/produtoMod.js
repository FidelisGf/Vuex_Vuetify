import productService from "@/service/productService"
export default{
    namespaced: true,
    state: {
        product: {
            ID_PRODUTO : '',
            NOME : '',
            DESC : '',  
            VALOR : 0,
            quantia_inicial : 0,
            category: {
              ID_CATEGORIA : null,
              NOME : ''
            },
          },
        Products : [],

    },
    getters: {
        listProducts(state){
            return state.Products
        },
        getProduct(state){
            return state.product
        },
    },
    mutations: {
        saveProduct(state, payload){
            state.product = payload
          },
        beginListProduct(state, payload){
            state.Products = payload
        },
        clearListProduct(state){
            state.Products.length = 0
        },
        saveListProduct(state, payload){
            state.Products.push(payload)
        },
        editListProduct(state, payload){
            state.Products =  state.Products.filter(item => item.ID_PRODUTO !== payload.ID_PRODUTO)
            state.Products.push(payload)
        },
        deleteInListProduct(state, payload){
            state.Products =  state.Products.filter(item => item.ID_PRODUTO !== payload)
        },
    },
    actions: {
        saveProduct(context, payload){
            context.commit('saveProduct', payload)
        },
        beginListProduct(context, payload){
            context.commit('beginListProduct', payload)
        },
        saveList(context, payload){
            context.commit('saveListProduct', payload)
        },
        post(context, payload){
            try {
                productService.postProduto(payload).then((res) => {
                
                    if (res.status == 200) {
                        console.log(res);
                        payload.ID_PRODUTO = res.data.ID_PRODUTO
                        alert("Produto salvo com sucesso");
                        context.saveList(payload)  
                    }
                });
            } catch (error) {
                alert('Falha ao cadastrar esse produto !')
            }
            
        }

    }  
}