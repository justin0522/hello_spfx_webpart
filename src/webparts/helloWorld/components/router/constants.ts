import PageList from '../pageList/PageList';
import PageForm from '../pageForm/pageForm';
import PageSucess from '../pageSucess/pageSucess';


export const CommonConstants: any = {
    router: [
        {
            key: "home",
            exact: true,
            component: PageList,
            url: "/home",
        },
        {
            key: "form",
            exact: false,
            component: PageForm,
            url: "/form",
        },
        {
            key: "sucess",
            exact: false,
            component: PageSucess,
            url: "/sucess", 
        }
    ]
}