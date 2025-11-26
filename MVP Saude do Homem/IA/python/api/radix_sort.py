from typing import List, Any, Union, Type, Dict
import datetime
from enum import IntEnum

class DataTypeOrder(IntEnum):
    NULL = 0
    INTEGER = 1
    DATE = 2
    STRING = 3

class RadixSort:
    """Classe para implementação do algoritmo Radix Sort otimizado para múltiplos tipos de dados.

    Atributos:
        None

    Métodos:
        sort_asc: Ordena a lista de forma ascendente.
        sort_desc: Ordena a lista de forma descendente.
        _separate_nulls: Separa valores nulos da lista.
        _get_data_type_rank: Retorna a classificação do tipo de dado para ordenação de tipos mistos.
        _normalize_value: Converte valores para representação numérica comparável.
        _get_max_length: Obtém o comprimento máximo da representação normalizada.
        _counting_sort: Sub-rotina de ordenação estável por dígito.
    """

    def sort_asc(self, data: List[Any]) -> List[Any]:
        """Ordena a lista de forma ascendente.

        Args:
            data: Lista de elementos a ser ordenada (inteiros, strings, datas ou mistos).

        Returns:
            Lista ordenada de forma ascendente.

        Raises:
            TypeError: Se houver tipos de dados não suportados.
        """
        if not data:
            return []

        nulls, non_nulls = self._separate_nulls(data)
        if not non_nulls:
            return nulls

        type_groups: Dict[DataTypeOrder, List[Any]] = self._group_by_data_type(non_nulls)
        sorted_groups = []

        for type_rank in sorted(type_groups.keys()):
            group = type_groups[type_rank]
            normalized = [self._normalize_value(val) for val in group]
            max_len = self._get_max_length(normalized)

            for digit_pos in range(max_len):
                group = self._counting_sort(group, digit_pos, max_len)

            sorted_groups.extend(group)

        return nulls + sorted_groups

    def sort_desc(self, data: List[Any]) -> List[Any]:
        """Ordena a lista de forma descendente.

        Args:
            data: Lista de elementos a ser ordenada (inteiros, strings, datas ou mistos).

        Returns:
            Lista ordenada de forma descendente.
        """
        sorted_asc = self.sort_asc(data)
        return sorted_asc[::-1]

    def _separate_nulls(self, data: List[Any]) -> tuple[List[Any], List[Any]]:
        """Separa valores nulos da lista de dados."""
        nulls = [val for val in data if val is None]
        non_nulls = [val for val in data if val is not None]
        return nulls, non_nulls

    def _group_by_data_type(self, data: List[Any]) -> Dict[DataTypeOrder, List[Any]]:
        """Agrupa elementos por tipo de dado para ordenação de tipos mistos."""
        groups = {}
        for val in data:
            type_rank = self._get_data_type_rank(val)
            if type_rank not in groups:
                groups[type_rank] = []
            groups[type_rank].append(val)
        return groups

    def _get_data_type_rank(self, val: Any) -> DataTypeOrder:
        """Retorna a classificação do tipo de dado para ordenação de tipos mistos."""
        if isinstance(val, int):
            return DataTypeOrder.INTEGER
        elif isinstance(val, (datetime.date, datetime.datetime)):
            return DataTypeOrder.DATE
        elif isinstance(val, str):
            return DataTypeOrder.STRING
        else:
            raise TypeError(f"Tipo de dado não suportado: {type(val).__name__}")

    def _normalize_value(self, val: Union[int, str, datetime.date, datetime.datetime]) -> str:
        """Converte valores para representação string numérica comparável."""
        if isinstance(val, int):
            return str(val).zfill(20)
        elif isinstance(val, (datetime.date, datetime.datetime)):
            return str(val.strftime("%Y%m%d%H%M%S")).zfill(20)
        elif isinstance(val, str):
            return ''.join(f'{ord(c):04d}' for c in val).ljust(200, '0')
        else:
            raise TypeError(f"Tipo de dado não suportado: {type(val).__name__}")

    def _get_max_length(self, normalized_values: List[str]) -> int:
        """Obtém o comprimento máximo da representação normalizada."""
        return max(len(val) for val in normalized_values)

    def _counting_sort(self, data: List[Any], digit_pos: int, max_len: int) -> List[Any]:
        """Sub-rotina de ordenação estável por dígito (complexidade O(n))."""
        count = [0] * 10
        output = [None] * len(data)

        for val in data:
            normalized = self._normalize_value(val)
            padded = normalized.ljust(max_len, '0')
            digit = int(padded[-(digit_pos + 1)] if (digit_pos + 1) <= len(padded) else '0')
            count[digit] += 1

        for i in range(1, 10):
            count[i] += count[i - 1]

        for val in reversed(data):
            normalized = self._normalize_value(val)
            padded = normalized.ljust(max_len, '0')
            digit = int(padded[-(digit_pos + 1)] if (digit_pos + 1) <= len(padded) else '0')
            output[count[digit] - 1] = val
            count[digit] -= 1

        return output