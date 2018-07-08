import React from 'react'
import { Button as ButtonUI, Input as InputUI, Select as SelectUI } from 'semantic-ui-react'

export const Search = props => (
    <InputUI placeholder='Поиск...' action>
        <input />
        <SelectUI compact options={[
            { key: '0', text: 'Все города', value: '0' },
            { key: '1', text: 'Санкт-Петербург', value: '1' },
            { key: '2', text: 'Выборг', value: '2' },
        ]} defaultValue='0' />
        <SelectUI compact options={[
            { key: '0', text: 'Все категории', value: '0' },
            { key: '1', text: 'Категория 1', value: '1' },
            { key: '2', text: 'Категория 2', value: '2' },
        ]} defaultValue='0' />

        <ButtonUI icon='filter' basic />
    </InputUI>
);
