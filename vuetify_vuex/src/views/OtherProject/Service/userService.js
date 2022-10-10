export default{
    getUsers(){
        return axios.get("http://localhost:8085/users")
    }
}