import React from 'react'
import Section from './Section'
import { ListRow } from '../ReUsableCodes'

const ListSection = ({ icon, title, data = [] }) => {
    return (
        <Section icon={icon} title={title}>
            {data?.length ? (
                data?.map((t, i) => (
                    <ListRow key={t.wot_slno || t.wop_slno || t.wob_slno}>
                        {i + 1}. {t.term_desc}
                    </ListRow>
                ))
            ) : (
                <Empty />
            )}
        </Section>
    )
}

export default ListSection