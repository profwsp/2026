import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, Button, Appbar, Snackbar, ActivityIndicator } from 'react-native-paper';
import { darkIndustrialColors } from '../theme/darkIndustrialTheme';

const ScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData({ type, data });
    setIsScanning(false);
    setVisible(true);
    
    console.log(`Code: ${data}, Type: ${type}`);
    // Lógica para processar o QR code scaneado
  };

  const resetScanner = () => {
    setScanned(false);
    setScannedData(null);
    setIsScanning(true);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.permissionContainer}>
        <ActivityIndicator size="large" color={darkIndustrialColors.cyan} />
        <Text style={styles.permissionText}>Solicitando permissões...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.errorText}>Permissão para câmera não concedida</Text>
        <Text style={styles.permissionSubtext}>
          Configure a permissão de câmera nas configurações do app
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content
          title="Scanner QR Code"
          subtitle="Leia um código para identificar máquina"
          titleStyle={styles.appbarTitle}
          subtitleStyle={styles.appbarSubtitle}
        />
      </Appbar.Header>

      <View style={styles.scannerContainer}>
        {isScanning ? (
          <>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.camera}
            />
            <View style={styles.overlay}>
              <View style={styles.unfocusedContainer} />
              <View style={styles.focusedContainer}>
                <View style={styles.cornerTopLeft} />
                <View style={styles.cornerTopRight} />
                <View style={styles.cornerBottomLeft} />
                <View style={styles.cornerBottomRight} />
              </View>
              <View style={styles.unfocusedContainer} />
            </View>
            <Text style={styles.cameraHint}>Alinhe o QR Code no visor</Text>
          </>
        ) : (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel} variant="headlineSmall">
              Código Lido
            </Text>
            <View style={styles.resultBox}>
              <Text style={styles.resultType}>{scannedData?.type}</Text>
              <Text style={styles.resultData}>{scannedData?.data}</Text>
            </View>
            <Button
              mode="contained"
              onPress={resetScanner}
              style={styles.resetButton}
              labelStyle={styles.resetButtonLabel}
            >
              Escanear Novamente
            </Button>
          </View>
        )}
      </View>

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
        style={styles.snackbar}
      >
        <Text style={styles.snackbarText}>QR Code capturado com sucesso!</Text>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkIndustrialColors.darkBg,
  },
  appbar: {
    backgroundColor: darkIndustrialColors.darkCard,
    borderBottomWidth: 1,
    borderBottomColor: darkIndustrialColors.darkBorder,
  },
  appbarTitle: {
    color: darkIndustrialColors.orange,
    fontSize: 20,
    fontWeight: 'bold',
  },
  appbarSubtitle: {
    color: darkIndustrialColors.textSecondary,
    fontSize: 12,
  },
  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  focusedContainer: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: darkIndustrialColors.orange,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 40,
    height: 40,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopColor: darkIndustrialColors.orange,
    borderLeftColor: darkIndustrialColors.orange,
  },
  cornerTopRight: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 40,
    height: 40,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopColor: darkIndustrialColors.orange,
    borderRightColor: darkIndustrialColors.orange,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: 40,
    height: 40,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomColor: darkIndustrialColors.orange,
    borderLeftColor: darkIndustrialColors.orange,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 40,
    height: 40,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomColor: darkIndustrialColors.orange,
    borderRightColor: darkIndustrialColors.orange,
  },
  cameraHint: {
    position: 'absolute',
    bottom: 40,
    color: darkIndustrialColors.orange,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  resultContainer: {
    width: '90%',
    backgroundColor: darkIndustrialColors.darkCard,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: darkIndustrialColors.darkBorder,
  },
  resultLabel: {
    color: darkIndustrialColors.textPrimary,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  resultBox: {
    width: '100%',
    backgroundColor: darkIndustrialColors.darkBg,
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: darkIndustrialColors.orange,
  },
  resultType: {
    color: darkIndustrialColors.textSecondary,
    fontSize: 12,
    marginBottom: 8,
  },
  resultData: {
    color: darkIndustrialColors.orange,
    fontSize: 16,
    fontWeight: 'bold',
    wordBreak: 'break-word',
  },
  resetButton: {
    width: '100%',
    backgroundColor: darkIndustrialColors.orange,
  },
  resetButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: darkIndustrialColors.darkBg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  permissionText: {
    color: darkIndustrialColors.textPrimary,
    marginTop: 16,
    textAlign: 'center',
  },
  permissionSubtext: {
    color: darkIndustrialColors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
  },
  errorText: {
    color: darkIndustrialColors.stopped,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  snackbar: {
    backgroundColor: darkIndustrialColors.darkCard,
    borderTopWidth: 1,
    borderTopColor: darkIndustrialColors.darkBorder,
  },
  snackbarText: {
    color: darkIndustrialColors.operating,
  },
});

export default ScannerScreen;
