import React, { useReducer, createContext } from 'react';
import { getAll } from 'api';

const initialPage = '/apmPage/entities/.*';

export const ObjectContext = createContext();

const initialState = {
  entities: [],
  width: window.innerWidth,
  height: window.innerHeight,
  loading: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ENTITIES':
      return {
        ...state,
        entities: [...action.payload]
      };
    case 'SET_SIZE':
      return {
        ...state,
        width: action.payload.wrapWidth,
        height: action.payload.wrapHeight
      };
    default:
      throw new Error();
  }
};

export const ObjectContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getEntities = () => {
    getAll(initialPage)
      .then((res) => {
        const result = res.data.reduce(
          (acc, item) => [...acc, ...JSON.parse(item.attributes.objects)],
          []
        );
        dispatch({
          type: 'SET_ENTITIES',
          payload: result
        });
      })
      .catch((e) => {
        console.log(`Error-${e}`);
      });
  }

  const setSize = size => dispatch({
    type: 'SET_SIZE',
    payload: size
  });

  return (
    <ObjectContext.Provider value={{ state, getEntities, setSize }}>
      {props.children}
    </ObjectContext.Provider>
  );
};
