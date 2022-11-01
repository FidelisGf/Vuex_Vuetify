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
        edit : false,
        countProduto : 0,
    },
    getters: {
        listProducts(state){
            return state.Products
        },
        getProduct(state){
            return state.product 
        },
        edit(state){
            return state.edit
        },
        getCount(state){
            return state.countProduto
        }
    },
    mutations: {
        saveProduct(state, payload){
            state.product = payload
        },
        saveCount(state, payload){
            state.countProduto = payload
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
            state.Products =  state.Products.filter(item => item.ID !== payload.ID)
            state.Products.push(payload)
        },
        deleteInListProduct(state, payload){
            state.Products =  state.Products.filter(item => item.ID !== payload)
        },
        activeEdit(state){
            state.edit = true
          },
        disableEdit(state){
            state.edit = false
        },
    },
    actions: {
        activeEdit(context){
            context.commit('activeEdit')
        },
        saveCount(context ,payload){
            context.commit("saveCount", payload)
        },
        disableEdit(context){
            context.commit('disableEdit')
        },
        clearListProduct(context){
            context.commit('clearListProduct')
        },
        saveProduct(context, payload){
            context.commit('saveProduct', payload)
        },
        editProduct(context, payload){
            
            productService.editProduct(payload, payload.ID).then((res) => {
                if (res.status == 200) {
                    context.commit("editListProduct", payload)
                    alert("Produto Editado com suceso !");
                }
            });
        },
        beginListProduct(context, payload){
            context.commit('clearListProduct')
            context.commit('beginListProduct', payload)
        },
        saveList(context, payload){
            context.commit('saveListProduct', payload)
        },
        deleteInList(context, payload){
            context.commit('deleteInListProduct', payload)
        },
        async findByAllCategory(context, payload){
            try {
                let resposta = {current_page : null, totalPage : null}
                await productService.findAllProductByCategory(payload.ID, payload.current_page).then((res) => {
                    context.commit("beginListProduct",res.data.data)
                    resposta.current_page = res.data.current_page;
                    resposta.totalPage = res.data.last_page;
                });
                return resposta
            } catch (error) {
                alert('Falha ao filtrar por Categoria !')
            }
           
           
        },
        async countProd(context){
            try {
                await productService.countProduto().then((res)=>{
                        context.commit("saveCount", res.data)
                })
            } catch (error) {
                console.log(error)    
            }
        },
        async findById(context, payload){
            try {
                let data = await productService.findProdutoById(payload).then((res)=>{
                    console.log(res.data)
                    return res.data
                })
                return data
            } catch (error) {
                alert('Não foi possivel identificar esse produto !')
            }
           
        },
        async post(context, payload){
            let text = null
            try {
                
                await productService.postProduto(payload).then((res) => {
                    if (res.status == 200) {
                        console.log(res);
                        payload.ID = res.data.ID
                        payload.QUANTIDADE = payload.quantidade_inicial
                        context.commit("saveListProduct",payload) 
                        context.dispatch("countProd") 
                        text = "Sucesso : produto cadastrado com sucesso !"
                    }
                });
                return text;
            } catch (error) {
                text = "Error : " + error.message
                return await text
            }
            
        }

    }  
}