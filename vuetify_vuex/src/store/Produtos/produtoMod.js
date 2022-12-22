import productService from "@/service/productService"
export default{
    namespaced: true,
    state: {
        product: {
            ID : '',
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
        qntdProd  : 0,
        countProduto : 0,
    },
    getters: {
        getQntdProd(state){
            return parseFloat( state.qntdProd )
        },
        listProducts(state){
            return state.Products
        },
        getProduct(state){
            return state.product 
        },
        getCount(state){
            return state.countProduto
        }
    },
    mutations: {
        SET_QUANTIDADE_PRODUTO(state, payload){
            state.qntdProd = payload
        },
        SAVE_PRODUTO(state, payload){
            state.product = payload
        },
        SAVE_COUNT(state, payload){
            state.countProduto = payload
        },
        BEGIN_LIST_PRODUCTS(state, payload){
            state.Products = payload
        },
        CLEAR_LIST_PRODUCTS(state){
            state.Products.length = 0
        },
        EDIT_IN_LIST_PRODUCTS(state, payload){
            state.Products =  state.Products.filter(item => item.ID !== payload.ID)
            state.Products.push(payload)
        },
        DELETE_IN_LIST_PRODUCTS(state, payload){
            state.Products =  state.Products.filter(item => item.ID !== payload)
        },
    },
    actions: {
        setQntdProd(context, payload){
            context.commit("SET_QUANTIDADE_PRODUTO", payload)
        },
        saveCount(context ,payload){
            context.commit("SAVE_COUNT", payload)
        },
        clearListProduct(context){
            context.commit('CLEAR_LIST_PRODUCTS')
        },
        saveProduct(context, payload){
            context.commit('SAVE_PRODUTO', payload)
        },
        async editProduct(context, payload){
            const text = productService.editProduct(payload, payload.ID).then((res)=>{
                if(res.status == 200){
                    context.commit("EDIT_IN_LIST_PRODUCTS", payload)
                    return "Sucesso : Produto editado !"
                }
            }).catch((error)=>{
                return "Error : " + error.response.data.message
            })
            return text
        },
        beginListProduct(context, payload){
            context.dispatch('clearListProduct')
            context.commit('BEGIN_LIST_PRODUCTS', payload)
        },
        saveList(context, payload){
            context.commit('SAVE_IN_LIST_PRODUCTS', payload)
        },
        async Entersearch(context, payload){
            const data = productService.Entersearch(payload).then((res)=>{
                return res.data
            }).catch((error)=>{
                return error
            })
            context.dispatch('clearListProduct')
            await context.commit('BEGIN_LIST_PRODUCTS', data)
        },

        deleteInList(context, payload){
            context.commit('DELETE_IN_LIST_PRODUCTS', payload)
        },
        async findByAllCategory(context, payload){
                const query = productService.findAllProductByCategory(payload.ID, payload.current_page).then((res) => {
                    let resposta = {current_page : null, totalPage : null}
                    context.dispatch("beginListProduct",res.data.data)
                    resposta.current_page = res.data.current_page;
                    resposta.totalPage = res.data.last_page;
                    return resposta
                }).catch(()=>{
                    alert('Falha ao filtrar por Categoria !')
                });
                return query
        },
        async countProd(context){
            productService.countProduto().then((res)=>{
                context.dispatch("saveCount", res.data)
            }).catch((error)=>{
                return error
            })
        },
        async findById(context, payload){
            const data = productService.findProdutoById(payload).then((res)=>{
                return res.data
            }).catch(()=>{
                alert('Não foi possivel identificar esse produto !')
            })
            return data
           
        },
        async post(context, payload){
            const text = productService.postProduto(payload).then((res)=>{
                if(res.status == 200){
                    payload.ID = res.data.ID
                    payload.QUANTIDADE = payload.quantia_inicial
                    context.dispatch("countProd") 
                    return "Sucesso : Produto cadastrado com sucesso !"
                }
            }).catch((error)=>{
                console.log(error.response.data.errors)
                return "Error : " + error.response.data.message

            })
            return text
        },
        async getLucroByProd(context, payload){
            const lucro = productService.getLucroByProduct(payload).then((res)=>{
                return res.data
            }).catch((error)=>{
                return error 
            })
            return lucro
        },
        getColors(){
            const data = productService.getColors().then((res)=>{
                return res.data
            }).catch((error)=>{
                return error
            })
            return data
        }

    }  
}