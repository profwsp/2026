import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { darkIndustrialColors } from '../theme/darkIndustrialTheme';
import { MACHINE_STATUS } from '../constants/constants';

const MachineCard = ({ machineId, name, status, temperature, vibration }) => {
  const getStatusColor = () => {
    switch (status) {
      case MACHINE_STATUS.OPERATING:
        return darkIndustrialColors.operating;
      case MACHINE_STATUS.ALERT:
        return darkIndustrialColors.warning;
      case MACHINE_STATUS.STOPPED:
        return darkIndustrialColors.stopped;
      default:
        return darkIndustrialColors.textMuted;
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case MACHINE_STATUS.OPERATING:
        return '● Operando';
      case MACHINE_STATUS.ALERT:
        return '⚠ Alerta';
      case MACHINE_STATUS.STOPPED:
        return '■ Parada';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <Card
      style={[styles.card, { borderLeftColor: getStatusColor() }]}
      contentStyle={styles.cardContent}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.machineId} variant="labelSmall">
            ID: {machineId}
          </Text>
          <Text style={styles.machineName} variant="titleMedium">
            {name}
          </Text>
        </View>
        <Chip
          style={{
            backgroundColor: getStatusColor(),
          }}
          textStyle={styles.chipText}
          label={getStatusLabel()}
        />
      </View>

      <View style={styles.metricsContainer}>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel} variant="bodySmall">
            Temperatura
          </Text>
          <Text style={styles.metricValue}>{temperature}°C</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel} variant="bodySmall">
            Vibração
          </Text>
          <Text style={styles.metricValue}>{vibration} mm/s</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: darkIndustrialColors.darkCard,
    borderLeftWidth: 4,
    marginBottom: 12,
  },
  cardContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
  },
  machineId: {
    color: darkIndustrialColors.textSecondary,
    marginBottom: 4,
  },
  machineName: {
    color: darkIndustrialColors.textPrimary,
    fontWeight: '600',
  },
  chipText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: darkIndustrialColors.darkBg,
    borderRadius: 8,
    padding: 12,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricLabel: {
    color: darkIndustrialColors.textSecondary,
    marginBottom: 4,
  },
  metricValue: {
    color: darkIndustrialColors.cyan,
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    width: 1,
    backgroundColor: darkIndustrialColors.darkBorder,
    marginHorizontal: 12,
  },
});

export default MachineCard;
