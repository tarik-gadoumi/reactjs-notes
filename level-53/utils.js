function useSafeDispatch(dispatch) {
  const isMounted = React.useRef(false);

  React.useLayoutEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return React.useCallback(
    (...args) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch] //todo tant que le dispatch ne change pas retourne moi la même instance de cette fonction (...args) => (mountedRef.current ? dispatch(...args) : void 0)
  );
}
function asyncReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return { status: 'pending', data: null, error: null };
    }
    case 'resolved': {
      return { status: 'resolved', data: action.data, error: null };
    }
    case 'rejected': {
      return { status: 'rejected', data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function useAsync(initialState) {
  const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  });
  const { data, error, status } = state;
  const dispatch = useSafeDispatch(unsafeDispatch); //* dispatch contrôlé maintenant  si l'appli est unmounted =>void 0

  const run = React.useCallback((promise) => {
    dispatch({ type: 'pending' });
    promise.then(
      (data) => {
        dispatch({ type: 'resolved', data });
      },
      (error) => {
        dispatch({ type: 'rejected', error });
      }
    );
  }, []);
  const setData = React.useCallback(
    (data) => dispatch({ type: 'resolved', data }),
    [dispatch]
  );
  const setError = React.useCallback(
    (error) => dispatch({ type: 'rejected', error }),
    [dispatch]
  );
  return {
    error,
    status,
    data,
    run,
    setData, // je l'ai copier de utils.js => sera utiliser pour le cache
    setError, // je l'ai copier de utils.js
  };
}
