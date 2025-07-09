import React from 'react';

export default function CardVip({vip}) {
    return  <>
        { vip == 1 ? <div className="table-card-vip">VIP</div>:
        <></> }
    </>
}