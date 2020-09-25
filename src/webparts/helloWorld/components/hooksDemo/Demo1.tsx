import * as React from 'react';
import { useState, useEffect } from 'react';
import { sp } from "@pnp/sp";
import { Web } from '@pnp/sp/webs';
import "@pnp/sp/lists";
import "@pnp/sp/folders";
import "@pnp/sp/items";
import "@pnp/sp/files";
import "@pnp/sp/content-types";
import '@pnp/sp/security';

function HooksDemo1(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let web = Web(props.context.pageContext.web.absoluteUrl);
            let result = await web.lists.getByTitle('Justin').items.getAll();
            setData(result);
        };

        fetchData();
    }, []);

    return (
        <ul>
            {data.map(item => (
                <li key={item.Id}>
                    <span>{item.Title}</span>
                </li>
            ))}
        </ul>
    );
}

export default HooksDemo1;