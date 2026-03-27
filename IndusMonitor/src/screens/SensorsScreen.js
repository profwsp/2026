import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Appbar, Chip, Card, SegmentedButtons, ActivityIndicator } from 'react-native-paper';
import { Accelerometer } from 'expo-sensors';
import { LineChart, AreaChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { darkIndustrialColors } from '../theme/darkIndustrialTheme';

const SensorsScreen = () => {
  const [data, setData] = useState([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [selectedAxis, setSelectedAxis] = useState('all');
  const [accelerometerData, setAccelerometerData] = useState({
    x: [],
    y: [],
    z: [],
  });

  useEffect(() => {
    // Set up accelerometer subscription
    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      setData((prevData) => {
        const newData = [
          ...prevData,
          {
            x: x,
            y: y,
            z: z,
            combined: Math.sqrt(x * x + y * y + z * z),
            timestamp: new Date().toLocaleTimeString(),
          },
        ];
        // Keep only last 100 data points for performance
        return newData.slice(-100);
      });
    });

    // Set accelerometer update interval
    Accelerometer.setUpdateInterval(500);

    return () => subscription.remove();
  }, []);

  const getChartData = () => {
    if (selectedAxis === 'all') {
      return data.map((d) => d.combined * 100); // Scale for visibility
    }
    return data.map((d) => Math.abs(d[selectedAxis]) * 100);
  };

  const getAverageVibration = () => {
    if (data.length === 0) return 0;
    const values =
      selectedAxis === 'all'
        ? data.map((d) => d.combined)
        : data.map((d) => Math.abs(d[selectedAxis]));
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
  };

  const getMaxVibration = () => {
    if (data.length === 0) return 0;
    const values =
      selectedAxis === 'all'
        ? data.map((d) => d.combined)
        : data.map((d) => Math.abs(d[selectedAxis]));
    return Math.max(...values).toFixed(2);
  };

  const getVibrationStatus = () => {
    const maxVibration = parseFloat(getMaxVibration());
    if (maxVibration < 1) return { status: 'Normal', color: darkIndustrialColors.operating };
    if (maxVibration < 3) return { status: 'Alerta', color: darkIndustrialColors.warning };
    return { status: 'Crítico', color: darkIndustrialColors.stopped };
  };

  const vibrationStatus = getVibrationStatus();
  const chartData = getChartData();

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content
          title="Sensores"
          subtitle="Monitoramento de Vibração (Acelerômetro)"
          titleStyle={styles.appbarTitle}
          subtitleStyle={styles.appbarSubtitle}
        />
      </Appbar.Header>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Status Summary */}
        <Card style={styles.statusCard}>
          <View style={styles.statusContent}>
            <View style={styles.statusLeft}>
              <Text style={styles.statusLabel} variant="bodySmall">
                Estado
              </Text>
              <Chip
                style={{
                  backgroundColor: vibrationStatus.color,
                  marginTop: 8,
                }}
                textStyle={styles.chipText}
                label={vibrationStatus.status}
              />
            </View>

            <View style={styles.statusRight}>
              <View style={styles.metricsBox}>
                <Text style={styles.metricLabel} variant="bodySmall">
                  Vibração Média
                </Text>
                <Text style={styles.metricValue}>{getAverageVibration()} m/s²</Text>
              </View>
              <View style={styles.metricsBox}>
                <Text style={styles.metricLabel} variant="bodySmall">
                  Pico
                </Text>
                <Text style={styles.metricValue}>{getMaxVibration()} m/s²</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Chart Selection */}
        <Text style={styles.sectionTitle} variant="labelLarge">
          Eixo de Monitoramento
        </Text>
        <SegmentedButtons
          value={selectedAxis}
          onValueChange={setSelectedAxis}
          buttons={[
            { value: 'all', label: 'Combinado' },
            { value: 'x', label: 'Eixo X' },
            { value: 'y', label: 'Eixo Y' },
            { value: 'z', label: 'Eixo Z' },
          ]}
          style={styles.segmentedButtons}
        />

        {/* Vibration Chart */}
        <Card style={styles.chartCard}>
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle} variant="titleMedium">
              Gráfico de Vibração (últimos 100 pontos)
            </Text>
            {chartData.length > 1 ? (
              <LineChart
                style={styles.chart}
                data={chartData}
                svg={{
                  stroke: darkIndustrialColors.cyan,
                  strokeWidth: 2,
                }}
                contentInset={{ top: 10, bottom: 10, left: 0, right: 0 }}
                curve={shape.curveNatural}
              />
            ) : (
              <View style={styles.chartPlaceholder}>
                <ActivityIndicator size="large" color={darkIndustrialColors.cyan} />
                <Text style={styles.chartPlaceholderText}>Coletando dados...</Text>
              </View>
            )}
          </View>
        </Card>

        {/* Detailed Metrics */}
        <Card style={styles.metricsCard}>
          <View style={styles.detailedMetrics}>
            <View style={styles.valueBox}>
              <Text style={styles.valueLabel}>Eixo X</Text>
              <Text style={styles.valueText}>
                {data.length > 0 ? data[data.length - 1].x.toFixed(2) : '0.00'} m/s²
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.valueBox}>
              <Text style={styles.valueLabel}>Eixo Y</Text>
              <Text style={styles.valueText}>
                {data.length > 0 ? data[data.length - 1].y.toFixed(2) : '0.00'} m/s²
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.valueBox}>
              <Text style={styles.valueLabel}>Eixo Z</Text>
              <Text style={styles.valueText}>
                {data.length > 0 ? data[data.length - 1].z.toFixed(2) : '0.00'} m/s²
              </Text>
            </View>
          </View>
        </Card>

        {/* Info */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle} variant="bodySmall">
            ℹ Informações
          </Text>
          <Text style={styles.infoText} variant="bodySmall">
            Os sensores de vibração monitoram os eixos X, Y e Z do acelerômetro do dispositivo.
            Utilize-o próximo à máquina para medir vibrações em tempo real.
          </Text>
        </View>
      </ScrollView>
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
    color: darkIndustrialColors.green,
    fontSize: 20,
    fontWeight: 'bold',
  },
  appbarSubtitle: {
    color: darkIndustrialColors.textSecondary,
    fontSize: 12,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  statusCard: {
    backgroundColor: darkIndustrialColors.darkCard,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: darkIndustrialColors.darkBorder,
  },
  statusContent: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLeft: {
    flex: 1,
  },
  statusLabel: {
    color: darkIndustrialColors.textSecondary,
    marginBottom: 4,
  },
  chipText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  statusRight: {
    flex: 1,
    marginLeft: 16,
  },
  metricsBox: {
    marginBottom: 8,
  },
  metricLabel: {
    color: darkIndustrialColors.textSecondary,
    fontSize: 11,
    marginBottom: 4,
  },
  metricValue: {
    color: darkIndustrialColors.green,
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: darkIndustrialColors.textPrimary,
    marginBottom: 12,
    marginTop: 8,
    fontWeight: 'bold',
  },
  segmentedButtons: {
    marginBottom: 20,
  },
  chartCard: {
    backgroundColor: darkIndustrialColors.darkCard,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: darkIndustrialColors.darkBorder,
    overflow: 'hidden',
  },
  chartContainer: {
    padding: 16,
  },
  chartTitle: {
    color: darkIndustrialColors.textPrimary,
    marginBottom: 12,
    fontWeight: '600',
  },
  chart: {
    height: 200,
    backgroundColor: darkIndustrialColors.darkBg,
    borderRadius: 8,
    marginBottom: 8,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: darkIndustrialColors.darkBg,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartPlaceholderText: {
    color: darkIndustrialColors.textSecondary,
    marginTop: 12,
  },
  metricsCard: {
    backgroundColor: darkIndustrialColors.darkCard,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: darkIndustrialColors.darkBorder,
  },
  detailedMetrics: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  valueBox: {
    flex: 1,
    alignItems: 'center',
  },
  valueLabel: {
    color: darkIndustrialColors.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  valueText: {
    color: darkIndustrialColors.cyan,
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: darkIndustrialColors.darkBorder,
    marginHorizontal: 12,
  },
  infoBox: {
    backgroundColor: darkIndustrialColors.darkCard,
    borderLeftWidth: 4,
    borderLeftColor: darkIndustrialColors.green,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoTitle: {
    color: darkIndustrialColors.green,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    color: darkIndustrialColors.textSecondary,
    lineHeight: 18,
  },
});

export default SensorsScreen;
