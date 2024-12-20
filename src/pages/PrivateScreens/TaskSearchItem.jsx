import React from 'react';
import {useInView} from "react-intersection-observer";
import Priority from "../../components/Priority/index.jsx";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

function TaskSearchItem({ item, setIsFocused }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const onClickItem = (id_task, id_project) => {
        history.push(`/project/${id_project}/task/${id_task}`);
        setIsFocused(false);
    }

    return (
        <div ref={ref} className={'taskItem'} key={item.id} onClick={() => onClickItem(item.id, item?.sprint?.project?.id)}>
            {inView && (
                <>
                    <Priority type={item?.priority} />
                    <p>{item?.no_task}</p>
                    <p className={'taskName'}>{item?.name}</p>
                </>
            )}
        </div>
    )
}

export default React.memo(TaskSearchItem);