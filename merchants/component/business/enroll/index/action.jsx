export const POSS_CURRENT = 'POSS_CURRENT';

export const getCurrent = (current) =>({
    type:POSS_CURRENT,
    poss:{
        current
    }
});

