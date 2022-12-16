import MyInput from "./UI/Input/MyInput";
import MySelect from "./UI/select/MySelect";
import React from 'react';

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
             <MyInput
          value={filter.searchQuery}
          placeholder={'Поиск...'}
          onChange={e => setFilter({...filter, searchQuery: e.target.value})}
        />
        <MySelect
          value={filter.sort}
          onChange ={e => setFilter({...filter, sort: e})}
          defaultValue={"Сортировка"}
          options={[
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По описанию'}
          ]}
        />
        </div>
    );

}

export default PostFilter;