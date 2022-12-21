<template>
  <div>
    <div class="white--text mt-14 mt-lg-12" >
      <p class="text-h4 ">Seja Bem-Vindo ao Empresarial...</p>
    </div>
    <div class="white--text text-introducao d-flex justify-space-between">
      <div>
          <p class="text-justify pl-0 pl-md-5 ">
          O sistem perfeito para você empresário que precisa ter o controle sobre sua empresa.
          Agora você tem acesso a diversos modulos disponiveis, como por exemplo gestão de estoque,
          vendas e despesas. Acompanhe o tutorial abaixo para aprender o básico do sistema.
          </p>
          <div class="text-justify pl-0 pl-md-10 mt-5 ">
                <p class="font-italic text-subtitle-1">Sumario : (clique no tema desejado)</p>
                <p class="font-italic text-subtitle-1 pl-6">Ações Básicas :</p>
                <div> 
                  <p class="pl-12 mt-n2 font-italic "><a href="#Cadastro_Materia" class="sumario">
                    Matéria Prima</a></p>
                  <p class="pl-12 mt-n2 font-italic "><a href="#Cadastro_Produto" class="sumario">
                    Cadastro Produto</a></p>
                  <p class="pl-12 mt-n2 font-italic "><a href="#Estoque_Produto" class="sumario">
                    Estoque Produto</a></p>
                  <p class="pl-12 mt-n2 font-italic "><a href="#Estoque_Materia" class="sumario">
                    Estoque Materia Prima</a></p>
                  <p class="pl-12 mt-n2 font-italic "><a href="#Editar" class="sumario">
                    Editar Item</a></p>
                  <p class="pl-12 mt-n2 font-italic "><a href="#Excluir" class="sumario">
                    Excluir Item</a></p>
                  <p class="pl-12 mt-n2 font-italic "><a href="#Despesa" class="sumario">
                    Cadastro de Despesa</a></p>
                  <p class="pl-12 mt-n2 font-italic "><a href="#Tipo_Despesa" class="sumario">
                    Cadastro Tipo de Despesa</a></p>
                </div>
                <p class="font-italic text-subtitle-1 pl-6">Venda :</p>
                <div>
                  <p class="pl-12 mt-n2 font-italic "><a href="#Adicionar_Venda" class="sumario">
                    Adicionar item a venda</a></p>
                  <p class="pl-12 mt-n2 font-italic "><a href="#Lista_Venda" class="sumario">
                    Manipular lista da venda</a></p>
                  <p class="pl-12 mt-n2 font-italic "><a href="#Cliente_Venda" class="sumario">
                    Vincular cliente na venda</a></p>
                  <p class="pl-12 mt-n2 font-italic "><a href="#Gerar_Venda" class="sumario">
                    Gerar a venda</a></p>
                  <p class="pl-12 mt-n2 font-italic "><a href="#Alterar_Venda" class="sumario">
                    Alterar venda</a></p>
                </div>
               
          </div>
         
          <p class="text-justify pl-0 pl-md-5" id="Cadastro_Materia">
              <b class="teal--text">(Cadastro de Matéria Prima)</b> : 
              Na barra lateral, clique em Gestão de Estoque.
              Após entrar em Gestão de Estoque clique no botão 
              que está em destaque na imagem abaixo ("MATERIAS PRIMAS").
              Será exibido um menu relacionado a matéria prima, selecione "ADICIONAR NOVA MATERIA PRIMA" e 
              insira os dados do seu material, depois clique em salvar. 
              Pronto está feito o registro da matéria
              prima, agora é só repetir o processo para as próximas;
          </p>
          <div class="pl-0 pl-md-5">
            <v-img
              max-height="450"
              max-width="450"
              src="../assets/passo_1.png"
            ></v-img>
          </div>
          <div class="divider ml-5 ml-md-11">
            <v-divider class="mt-5" color="white"></v-divider>
          </div>
          
          <p class="text-justify mt-5 pl-0 pl-md-5" id="Cadastro_Produto">
            <b class="teal--text">(Cadastro de Produto)</b> : Na barra lateral, clique em Gestão de Estoque.
              Após entrar em Gestão de Estoque clique no botão que está em destaque na imagem abaixo ("NOVO PRODUTO").
              Insira os dados do produto , caso não houver Categoria cadastrada, apenas clique no ("+") ao lado do campo,
              insira o nome da nova categoria e clique em salvar, a mesma lógica pode ser aplicada para o campo medida.
              Clique em próximo, nessa tela será necessário digitar o código das matérias primas que irão compor esse produto, 
              use o f2 no campo do código para exibir uma lista que contem as matérias primas e seus respectivos códigos. Depois
              selecione a quantidade do mesmo e clique no botão ("+") ao lado do campo quantidade. Para ver a lista de matérias 
              de um produto, clique no icone do lado direito de ("+"), dentro dessa lista você poderá excluir um item dela 
              ou manipular a quantidade do mesmo. Após ter manipulado a lista e adicionado os matériais necessários, clique em 
              "SALVAR".
          </p>
          <div class="pl-0 pl-md-5">
            <v-img
              max-height="450"
              max-width="450"
              src="../assets/passo_2.png"
            ></v-img>
          </div>
          <div class="divider ml-5 ml-md-11">
            <v-divider class="mt-5" color="white"></v-divider>
          </div>
          <p class="text-justify mt-5 pl-0 pl-md-5" id="Estoque_Produto">
            <b class="teal--text">(Manipulação de Estoque)</b> : Na barra lateral, clique em Gestão de Estoque.
            Após entrar em Gestão de Estoque clique no botão que está em destaque na imagem abaixo ("ESTOQUE").
            Uma tela será aberta, nela insira o codigo do produto e quantidade que você deseja adicionar ao estoque,
            caso não saiba o codigo do produto, é possivel encontrá-lo na lista abaixo. Obs : ao adicionar quantidade
            ao estoque de um item, tenha em mente que será descontado a quantidade de matérias primas necessárias para faze-lo
            ou seja, é necessário ter uma quantidade de matéria prima disponivel para isso.
          </p>
          <div class="pl-0 pl-md-5">
            <v-img
              max-height="450"
              max-width="450"
              src="../assets/passo_3.png"
            ></v-img>
          </div>
          <div class="divider ml-5 ml-md-11">
            <v-divider class="mt-5" color="white"></v-divider>
          </div>
          <p class="text-justify mt-5 pl-0 pl-md-5" id="Estoque_Materia">
            <b class="teal--text">(Manipulação de Estoque Matéria Prima)</b> : Na barra lateral, clique em Gestão de Estoque.
            Após entrar em Gestão de Estoque clique no botão que está em destaque na imagem abaixo ("MATERIA PRIMA").
            Será exibido um menu relacionado a matéria prima, selecione "AUMENTAR ESTOQUE DA MATERIA", após isso 
            digite o codigo da matéria prima e a quantidade que deseja inserir na mesma. Obs : caso não saiba o codigo da
            matéria é possivel apertar f2, que irá exibir uma lista com todas disponiveis no sistema, com seus respectivos 
            codigos. 
          </p>
          <div class="pl-0 pl-md-5">
            <v-img
              max-height="450"
              max-width="450"
              src="../assets/passo_1.png"
            ></v-img>
          </div>
          <div class="divider ml-5 ml-md-11">
            <v-divider class="mt-5" color="white"></v-divider>
          </div>
          <p class="text-justify mt-5 pl-0 pl-md-5" id="Editar">
            <b class="teal--text">(Edição de Item)</b> : A edição de item está presente em dois módulos,
            são eles : Gestão de Estoque e Despesas. Para realizar a edição de um produto ou de uma despesa 
            é necessário apenas clicar no botão ilustrado pela imagem abaixo (pincel azul). Será aberta uma tela onde você 
            poderá alterar as informações do item. Clicando em salvar o item será alterado se todos os campos 
            estiverem de acordo com as regras de inserção. 
          </p>
          <div class="pl-0 pl-md-5">
            <v-img
              max-height="450"
              max-width="450"
              src="../assets/passo_4.png"
            ></v-img>
          </div>
          <div class="divider ml-5 ml-md-11">
            <v-divider class="mt-5" color="white"></v-divider>
          </div>
          <p class="text-justify mt-5 pl-0 pl-md-5" id="Excluir">
            <b class="teal--text">(Deletar Item)</b> : A exclusão de item está presente em dois módulos,
            são eles : Gestão de Estoque e Despesas. Para realizar a exclusão de um produto ou de uma despesa 
            é necessário apenas clicar no botão ilustrado pela imagem abaixo (lixeira vermelha). Será aberta uma tela onde você 
            poderá confirmar a exclusão do item ou não.
          </p>
          <div class="pl-0 pl-md-5">
            <v-img
              max-height="450"
              max-width="450"
              src="../assets/passo_4.png"
            ></v-img>
          </div>
          <div class="divider ml-5 ml-md-11">
            <v-divider class="mt-5" color="white"></v-divider>
          </div>
          <p class="text-justify mt-5 pl-0 pl-md-5" id="Despesa">
            <b class="teal--text">(Cadastro de Despesas)</b> : Na barra lateral, clique em Despesas.
            Após entrar em Despesas clique no botão que está em destaque na imagem abaixo ("DESPESAS").
            Será exibido um formulário para realizar o cadastro, é importante salientar que antes de realizar 
            o cadastro de uma despesa, deve ser feito o cadastro de um tipo de despesa. Após preencher o formulário 
            apenas clique em salvar.
          </p>
          <div class="pl-0 pl-md-5">
            <v-img
              max-height="450"
              max-width="450"
              src="../assets/passo_5.png"
            ></v-img>
          </div>
          <div class="divider ml-5 ml-md-11">
            <v-divider class="mt-5" color="white"></v-divider>
          </div>
          <p class="text-justify mt-5 pl-0 pl-md-5" id="Tipo_Despesa">
            <b class="teal--text">(Cadastro Tipo de Despesa)</b> : Na barra lateral, clique em Despesas.
            Após entrar em Despesas clique no botão que está em destaque na imagem abaixo ("TIPO DE DESPESA").
            Será exibido um formulário para realizar o cadastro, Após preencher o formulário 
            apenas clique em salvar.
          </p>
          <div class="pl-0 pl-md-5">
            <v-img
              max-height="450"
              max-width="450"
              src="../assets/passo_6.png"
            ></v-img>
          </div>
          <div class="divider ml-5 ml-md-11">
            <v-divider class="mt-5" color="white"></v-divider>
          </div>
          <p class="text-justify mt-5 pl-0 pl-md-5" id="Adicionar_Venda">
            <b class="teal--text">(Adicionar Item na Venda)</b> : Na barra lateral, clique em Registrar Venda.
            Após entrar em Registrar Venda , digite o codigo do produto no campo destacado na imagem abaixo, caso
            você não saiba o codigo do produto, é possivel utilizar tecla "f2", ela irá exibir uma lista com os produtos 
            disponiveis para venda, tendo seus respectivos códigos. Apóis inserir o código, insira a quantidade a ser vendida 
            desse produto no campo da direita. Feito isso apenas clique no botão ("+") localizado a direita do campo quantidade. 
          </p>
          <div class="pl-0 pl-md-5">
            <v-img
              max-height="450"
              max-width="450"
              src="../assets/passo_7.png"
            ></v-img>
          </div>
          <div class="divider ml-5 ml-md-11">
            <v-divider class="mt-5" color="white"></v-divider>
          </div>
          <p class="text-justify mt-5 pl-0 pl-md-5" id="Lista_Venda">
            <b class="teal--text">(Lista da Venda)</b> : Dentro do modulo Registrar Vendas temos 
            o icone de um carrinho de supermercado, indicado na imagem abaixo, clique sobre ele para ter 
            acesso a lista de produtos já adicionados a venda. Dentro dessa lista existem duas opções em cada item 
            editar e excluir. O editar é representado pelo lapis azul , clicando nele você poderá alterar a quantidade 
            daquele produto presente nessa venda. O excluir é representado pelo X, clicando nele você irá retirar esse produto 
            da venda, então cuidado. Assim que realizar as operações necessárias é so fechar clicando no X superior ou teclando 
            ESC.  
          </p>
          <div class="d-flex flex-md-row flex-column">
            <div class="pl-0 pl-md-5">
              <v-img
                max-height="450"
                max-width="450"
                src="../assets/passo_8.jpg"
              ></v-img>
            </div>
            <div class="pl-0 pl-md-5 mt-2 mt-md-0">
              <v-img
                max-height="450"
                max-width="450"
                src="../assets/passo_9.jpg"
              ></v-img>
            </div>
          </div>
         
          <div class="divider ml-5 ml-md-11">
            <v-divider class="mt-5" color="white"></v-divider>
          </div>
          <p class="text-justify mt-5 pl-0 pl-md-5" id="Cliente_Venda">
            <b class="teal--text">(Vincular Cliente)</b> : Dentro do modulo Registrar Vendas podemos clicar no icone 
            indicado na imagem para vincular um cliente a essa venda. Será requisitado o codigo desse cliente, caso 
            você não tenha conhecimento do mesmo, tecle f2 e será exibido uma lista de todos os clientes disponiveis 
            com seus respectivos código. Se por ventura não houver clientes registrados, você pode clicar no botão 
            indicado na outra imagem abaixo ("+"), para realizar o cadastro rapido de um cliente. Após ter inserido 
            o codigo do cliente, basta somente clicar em vincular.   
          </p>
          <div class="d-flex flex-md-row flex-column">
            <div class="pl-0 pl-md-5">
              <v-img
                max-height="450"
                max-width="450"
                src="../assets/passo_12.jpg"
              ></v-img>
            </div>
            <div class="pl-0 pl-md-5 mt-2 mt-md-0">
              <v-img
                max-height="450"
                max-width="450"
                src="../assets/passo_13.png"
              ></v-img>
            </div>
          </div>
          <div class="divider ml-5 ml-md-11">
            <v-divider class="mt-5" color="white"></v-divider>
          </div>
          <p class="text-justify mt-5 pl-0 pl-md-5" id="Gerar_Venda">
            <b class="teal--text">(Gerar Venda)</b> : Dentro do modulo Registrar Vendas após manipular a lista 
            e adicionar os itens a venda, podemos finaliza-la, para isso basta selecionarmos os campos restantes 
            ilustrados na imagem abaixo. O campo "metodo de pagamento" determina de qual maneira essa venda será paga,
            essa informação servirá para relátorios do sistema. O campo  "Situação desse pedido" refere-se ao estado do 
            pedido, ou seja se ele será pago agora ou o cliente pagará depois. Caso o pedido vá com a situação "Pagamento pendente"
            não será gerado uma venda, e sim um orçamento para o cliente. Tornando o Registrar Venda tanto para gerar uma venda real 
            ou simplesmente gerar um orçamento dos produtos para o cliente, cabendo a ele ou não comprar. Após ter 
            preenchido todos os campos, apenas clique no botão "GERAR VENDA", e um pdf será gerado exibindo todas as 
            informações da venda.
          </p>
          <div class="d-flex flex-md-row flex-column">
            <div class="pl-0 pl-md-5">
              <v-img
                max-height="450"
                max-width="450"
                src="../assets/passo_10.png"
              ></v-img>
            </div>
            <div class="pl-0 pl-md-5 mt-2 mt-md-0">
              <v-img
                max-height="450"
                max-width="450"
                src="../assets/passo_11.png"
              ></v-img>
            </div>
          </div>
          <div class="divider ml-5 ml-md-11">
            <v-divider class="mt-5" color="white"></v-divider>
          </div>
          <p class="text-justify mt-5 pl-0 pl-md-5" id="Alterar_Venda">
            <b class="teal--text">(Alterar Venda)</b> : Dentro do modulo Registrar Vendas após ter gerado uma 
            venda é possivel consultar ela novamente , basta clicar no icone de lupa indicado pela imagem abaixo 
            e inserir o codigo do pedido no formulário que irá se abrir. Fazendo isso você vai puxar todos os dados 
            daquele pedido, podendo alterar os produtos ou mudar a situação do pagamento, transformando por exemplo, 
            um orçamento em pedido
          </p>
          <div class="pl-0 pl-md-5">
            <v-img
              max-height="450"
              max-width="450"
              src="../assets/passo_14.jpg"
            ></v-img>
          </div>
          <div class="divider ml-5 ml-md-11">
            <v-divider class="mt-5" color="white"></v-divider>
          </div>
      </div>
      <v-fab-transition class="align-self-end">
        <v-btn
          v-show="true"
          color="grey accent-2"
          dark
          class="mr-0 mt-0 mr-md-10 mt-md-16"
          right
          absolute
          fixed
          @click="scrollBack"
          icon
          fab
        >
          <v-icon >mdi-arrow-up-drop-circle</v-icon>
        </v-btn>
      </v-fab-transition>  
    </div>
  </div>
      
</template>

<script>
export default {
  methods:{
      scrollBack(){
          scrollTo(0, 0)
      }
    }
}
</script>

<style lang="scss" scoped>
.text-introducao{
  width: 90%;
}
.sumario{
  
  color: #E0E0E0 !important;
}
.divider{
  width: 90%;
}
</style>