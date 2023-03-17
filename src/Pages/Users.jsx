import moment from 'moment/moment';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../components/Loader/Loader';
import Card from '../components/Navbar/Card/Card';
import style from './Users.module.scss';

const Users = () => {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState();
    const [sortingOption, setSortingOption] = useState();
    const [loading, setLoading] = useState();

    const fetchRepos = async () => {
        const res = await fetch(`https://api.github.com/users/${search}/repos?page=1&per_page=50`);
        const data = await res.json();
        setItems(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchRepos();
    }, []);


    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    const sortOptions = [
        {
            name: "",
            value: ""
        },
        {
            name: "Stars",
            value: "stars"
        },
        {
            name: "Watcher Count",
            value: "watcherCount"

        },
        {
            name: "Score",
            value: "score"
        },
        {
            name: "Name",
            value: "name"
        },
        {
            name: "Created At",
            value: "createdAt"
        },
        {
            name: "Updated At",
            value: "updatedAt"
        },

    ]

    const handleSubmit = () => {
        setLoading(true);
        try {
            fetchRepos();
        } catch (err) {
            console.log("err", err);
        }
    }

    const handleSort = (event) => {
        setSortingOption(event.target.value);
        if (event.target.value === "stars") {
            const sortedItems = items.sort((a, b) => b.stargazers_count - a.stargazers_count);
            setItems(sortedItems);
        }

        if (event.target.value === "watcherCount") {
            const sortedItems = items.sort((a, b) => b.watchers_count - a.watchers_count);
            setItems(sortedItems);
        }

        if (event.target.value === "createdAt") {
            const sortedItems = items.sort((a, b) => moment(b.created_at) - moment(a.created_at))
            setItems(sortedItems);
        }

        if (event.target.value === "updatedAt") {
            const sortedItems = items.sort((a, b) => moment(b.updated_at) - moment(a.updated_at))
            setItems(sortedItems);
        }

        if (event.target.value === "name") {
            const sortedItems = items.sort((a, b) => a.name.localeCompare(b.name));
            setItems(sortedItems);
        }

        if (event.target.value === "score") {
            const sortedItems = items.sort((a, b) => b.forks_count - a.forks_count);
            setItems(sortedItems);
        }
    }


    return (<>
        <div className={style.container}>
            <div className={style.inputContainer}>
                <div className={style.input}>
                    <input placeholder='Enter git username here' className={style.inputField} onChange={handleChange} value={search} />
                    <button onClick={handleSubmit} className={style.customButton}>Search</button>
                </div>
                <div className={style.filterSelect}>
                    <div>Sort By</div>
                    <label htmlFor="multiSelect">
                        <select defaultValue={''} id="multiSelect" value={sortingOption} onChange={handleSort} className={style.selects}>
                            {sortOptions.map((a) => {
                                return (<>
                                    <option value={a.value}>{a.name}</option>
                                </>)
                            })
                            }
                        </select>
                    </label>
                </div>
            </div>
            {loading && <Loader />}
            <div className={style.innerContainer} >
                {items?.map((details) => {
                    return (<>
                        <Card
                            repoName={details.name.toUpperCase()}
                            imageLink={details.owner.avatar_url}
                            description={details.description == null ? "---" : details.description}
                            stars={details.stargazers_count}
                            language={details.language == null ? "---" : details.language}
                        /></>)
                })
                }
            </div>
        </div>
    </>)
}

export default Users;