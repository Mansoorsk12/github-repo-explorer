import {
  useCallback,
  useEffect,
  useRef,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  Alert,
  Box,
  CircularProgress,
  Skeleton,
  Typography,
} from "@mui/material";

import RepoCard from "../RepoCard/RepoCard";

import {
  fetchNextReposRequest,
  fetchReposRequest,
} from "../../redux/repoSlice";


function RepoSkeleton() {

  return (
    <Box className="repo-skeleton">

      <Skeleton
        variant="rounded"
        width={64}
        height={64}
      />

      <Box sx={{ flex: 1 }}>

        <Skeleton
          width="42%"
          height={30}
        />

        <Skeleton
          width="82%"
          height={20}
        />

        <Skeleton
          width="52%"
          height={24}
        />

      </Box>

    </Box>
  );
}


function RepoList() {

  const dispatch = useDispatch();

  const {
    repos,
    loading,
    error,
    hasMore,
  } = useSelector(
    (state) => state.repos
  );


  const observer =
    useRef(null);


  const lastRepoRef =
    useCallback(
      (node) => {

        if (
          loading ||
          !hasMore
        ) {
          return;
        }

        if (observer.current) {
          observer.current.disconnect();
        }


        observer.current =
          new IntersectionObserver(
            (entries) => {

              if (
                entries[0].isIntersecting
              ) {

                dispatch(
                  fetchNextReposRequest()
                );

              }

            },
            {
              rootMargin: "320px",
            }
          );


        if (node) {
          observer.current.observe(node);
        }

      },
      [
        dispatch,
        loading,
        hasMore,
      ]
    );


  useEffect(() => {

    return () =>
      observer.current?.disconnect();

  }, []);


  if (
    loading &&
    repos.length === 0
  ) {

    return (
      <Box>

        {[1, 2, 3, 4].map(
          (item) => (
            <RepoSkeleton
              key={item}
            />
          )
        )}

      </Box>
    );
  }


  if (
    error &&
    repos.length === 0
  ) {

    return (
      <Alert
        severity="error"
        action={
          <Typography
            component="button"
            onClick={() =>
              dispatch(
                fetchReposRequest()
              )
            }
            sx={{
              border: 0,
              background:
                "transparent",
              color: "inherit",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Retry
          </Typography>
        }
      >
        {error}
      </Alert>
    );
  }


  if (repos.length === 0) {

    return (
      <Typography
        color="text.secondary"
        sx={{
          py: 6,
          textAlign: "center",
        }}
      >
        No repositories found
        for this period.
      </Typography>
    );
  }


  return (
    <Box>

      {repos.map(
        (repo, index) => {

          const isLast =
            index ===
            repos.length - 1;

          return (

            <Box
              key={repo.id}
              ref={
                isLast
                  ? lastRepoRef
                  : undefined
              }
            >

              <RepoCard
                repo={repo}
              />

            </Box>
          );
        }
      )}


      {loading && (

        <Box className="load-more">

          <CircularProgress
            size={24}
          />

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Loading more
            repositories...
          </Typography>

        </Box>
      )}


      {!hasMore && (

        <Typography
          className="end-message"
        >
          You have reached the end
          of the available results.
        </Typography>

      )}


      {error &&
        repos.length > 0 && (

          <Alert
            severity="warning"
            sx={{ mt: 2 }}
          >
            {error}
          </Alert>

        )}

    </Box>
  );
}

export default RepoList;