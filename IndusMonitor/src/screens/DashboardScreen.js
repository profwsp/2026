import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, FAB, Appbar, Chip } from 'react-native-paper';
import MachineCard from '../components/MachineCard';
import { darkIndustrialColors } from '../theme/darkIndustrialTheme';
import { MACHINE_STATUS } from '../constants/constants';

const DashboardScreen = () => {
  const [machines, setMachines] = useState([
    {
      id: 'MQ-001',
      name: 'Torno CNC',
      status: MACHINE_STATUS.OPERATING,
      temperature: 65,
      vibration: 2.3,
    },
    {
      id: 'MQ-002',
      name: 'Fresadora',
      status: MACHINE_STATUS.ALERT,
      temperature: 85,
      vibration: 5.8,
    },
    {
      id: 'MQ-003',
      name: 'Prensa Hidráulica',
      status: MACHINE_STATUS.STOPPED,
      temperature: 45,
      vibration: 0.1,
    },
    {
      id: 'MQ-004',
      name: 'Impressora 3D',
      status: MACHINE_STATUS.OPERATING,
      temperature: 72,
      vibration: 1.2,
    },
    {
      id: 'MQ-005',
      name: 'Compressor de Ar',
      status: MACHINE_STATUS.ALERT,
      temperature: 78,
      vibration: 4.5,
    },
  ]);

  const getStatusCount = () => {
    const operating = machines.filter((m) => m.status === MACHINE_STATUS.OPERATING).length;
    const warning = machines.filter((m) => m.status === MACHINE_STATUS.ALERT).length;
    const stopped = machines.filter((m) => m.status === MACHINE_STATUS.STOPPED).length;
    return { operating, warning, stopped };
  };

  const counts = getStatusCount();

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content
          title="Dashboard"
          subtitle="Monitoramento Industrial"
          titleStyle={styles.appbarTitle}
          subtitleStyle={styles.appbarSubtitle}
        />
      </Appbar.Header>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Status Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.statusChip}>
            <Text style={styles.statusIcon}>●</Text>
            <View>
              <Text style={styles.statusCount}>{counts.operating}</Text>
              <Text style={styles.statusLabel}>Operando</Text>
            </View>
          </View>

          <View style={styles.statusChip}>
            <Text style={[styles.statusIcon, { color: darkIndustrialColors.warning }]}>
              ⚠
            </Text>
            <View>
              <Text style={styles.statusCount}>{counts.warning}</Text>
              <Text style={styles.statusLabel}>Alerta</Text>
            </View>
          </View>

          <View style={styles.statusChip}>
            <Text style={[styles.statusIcon, { color: darkIndustrialColors.stopped }]}>
              ■
            </Text>
            <View>
              <Text style={styles.statusCount}>{counts.stopped}</Text>
              <Text style={styles.statusLabel}>Parada</Text>
            </View>
          </View>
        </View>

        {/* Machine List */}
        <View style={styles.machinesSection}>
          <Text style={styles.sectionTitle} variant="headlineSmall">
            Máquinas Monitoradas
          </Text>
          {machines.map((machine) => (
            <MachineCard
              key={machine.id}
              machineId={machine.id}
              name={machine.name}
              status={machine.status}
              temperature={machine.temperature}
              vibration={machine.vibration}
            />
          ))}
        </View>
      </ScrollView>

      <FAB
        icon="refresh"
        style={[styles.fab, { backgroundColor: darkIndustrialColors.cyan }]}
        label="Atualizar"
        onPress={() => {
          // Refresh logic
          console.log('Refreshing dashboard...');
        }}
      />
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
    color: darkIndustrialColors.cyan,
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
    paddingBottom: 100,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  statusChip: {
    flex: 1,
    backgroundColor: darkIndustrialColors.darkCard,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: darkIndustrialColors.darkBorder,
  },
  statusIcon: {
    fontSize: 24,
    color: darkIndustrialColors.operating,
    marginBottom: 4,
  },
  statusCount: {
    color: darkIndustrialColors.cyan,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusLabel: {
    color: darkIndustrialColors.textSecondary,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 2,
  },
  machinesSection: {
    marginTop: 8,
  },
  sectionTitle: {
    color: darkIndustrialColors.textPrimary,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default DashboardScreen;
