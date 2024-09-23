import { Component,fragment } from "react";
import mysql 'mysql'

class conn extends Component {
    render(){
        return(
            mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'latihan_baru'
            });

            console.log(mysql);
        )
    }
}


export default conn;