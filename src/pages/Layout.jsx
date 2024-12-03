import { Component } from 'react'
import { Outlet } from 'react-router';
import { AppContext } from '../app/context';
import { Link } from 'react-router-dom';

// Файл, описывающий лэйаут приложения
export class Layout extends Component {
    // Подключение к контексту, который внедрен в приложение компонентой верхнего уровня
    static contextType = AppContext;
    
    render() {
        return (
            <div className='layout'>
                <div className='navigator'
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '20px 10px',
                        color: 'white',
                        backgroundColor: 'black'
                    }}>
                    <div className='logo'>
                        Логотип
                    </div>
                    <div className='actions'>
                        {/* // Читаем значение из контекста и делаем условную отрисовку */}
                        {this.context.user !== undefined && (
                            <>
                                {/*
                                    // Компонента link позволяет добавлять ссылки в приложение таким образом,
                                    // чтобы они вызывали перезагрузку страницы
                                */}
                                <Link to='/login' onClick={this.context.logout}>Выйти</Link>
                            </>
                        ) || (
                            <>
                                <Link to='/todos' onClick={this.context.login}>Войти</Link>
                                <Link to='/register' onClick={this.context.login}>Зарегистрироваться</Link>
                            </>
                        )}
                    </div>
                </div>

                {/* // Эта компонента позволяет обозначитб то место, куда в лэйауте приложения должен быть подставлен контент страницы */}
                <Outlet />
            </div>
        );
    }
}