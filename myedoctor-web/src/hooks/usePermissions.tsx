import { requestMediaPermissions } from 'mic-check';
import { useCallback, useEffect, useState } from 'react';

const usePermissions = () => {
  const [hasWebcamPermissions, setHasWebcamPermissions] = useState(true);
  const [hasLocationPermissions, setHasLocationPermissions] = useState(true);

  const requestLocationPermission = useCallback(async () => {
    return await navigator.permissions.query({
      name: 'geolocation',
    });
  }, []);

  useEffect(() => {
    const checkInterval = setInterval(() => {
      requestMediaPermissions()
        .then(() => {
          setHasWebcamPermissions(true);
        })
        .catch(() => {
          setHasWebcamPermissions(false);
        });

      requestLocationPermission()
        .then((status: PermissionStatus) => {
          if (status.state === 'granted') setHasLocationPermissions(true);
          else setHasLocationPermissions(false);
        })
        .catch(() => {
          setHasLocationPermissions(false);
        });
    }, 1000);

    return () => clearInterval(checkInterval);
  }, [requestLocationPermission, requestMediaPermissions]);

  return { hasWebcamPermissions, hasLocationPermissions };
};

export default usePermissions;
