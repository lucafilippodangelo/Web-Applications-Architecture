import {useCallback, useEffect, useRef, useState} from 'react';

//LD "useHttpClient" will do all the studd I'm currently doing manually in each component.
export const useHttpClient = () => {
    //want to manage loading and error message in a centralised way
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    //LD the below array do not change across re-render cycles.
    // doing this to avoid doing assignments while during execution page has changed
    // as an example user click a link during an in-progress render.
    const activeHttpRequests = useRef([]);

    //LD generic function(configurable) to send a request
    const sendRequest = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {


            setIsLoading(true);//REACT updates straight away with the spinner because
            //detect that the below actions are async and there will be some time gap

            const httpAbortCtrl = new AbortController();
            activeHttpRequests.current.push(httpAbortCtrl);

            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortCtrl.signal
                    //LD JUST ABOVE react setup to link abort controller to this fetch request
                    // and now can use the abort controller to cancel the request
                });

                //LD REFERENCE_001


                //LD HANDLING MAIL ALREADY USED CASE
                if (response.status === 400) {
                    const responseJSON = await response.json();


                    throw new Error(responseJSON.message);
                }

                //LD HANDLING DELETE CASE
                let responseData = null;
                if (response.status !== 204) //204 is DELETE SUCCESS. (no content is returned)
                {
                    responseData = await response.json();

                }

                //LD when having successful response need to remove "httpAbortCtrl"
                // from the current active http request
                activeHttpRequests.current = activeHttpRequests.current.filter(
                    reqCtrl => reqCtrl !== httpAbortCtrl
                );

                // *****************************
                // ******** WEIRD BEHAVIOUR ****
                // *****************************
                //LD GENERATING ERROR IF 204, when it should not with the 200 family
                if (!response.ok) {

                    throw new Error(response.message);
                }

                setIsLoading(false);
                return responseData;
            } catch (err) {

                setError(err.message);
                setIsLoading(false);
                throw err;//throwing it to let component using the hook that an error was fired
            }
        },
        [] //callback to ensure no re-render any time the component using this hook gets re-rendered
    );

    //the below can be called by the function using this hook this thanks to exposing it in the return
    const clearError = () => {
        setError(null);
    };

    //cleanup function when unmounting
    useEffect(() => {
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    //LD this is the main return, so the return of "useHttpClient".
    //this function is calling "sendRequest"
    return {isLoading, error, sendRequest, clearError};
};